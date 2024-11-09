import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import {
    Cancellation,
    Client,
    Location,
    LocationProduct,
    Order,
    Payment,
    Product,
    ProductOrder,
    Shop,
} from '@/server/entities';
import { BankAccountsService } from '@/server/modules/bank-accounts/services';
import { generateCode, generateSecurityCode, Utils } from '@/server/utilities';
import { DeepPartial, Equal, ILike, Like, Or, Repository } from 'typeorm';
import { CodeService } from './code.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        @InjectRepository(ProductOrder)
        private readonly productOrderRepository: Repository<ProductOrder>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(Location)
        private readonly locationRepository: Repository<Location>,
        @InjectRepository(LocationProduct)
        private readonly locationProductRepository: Repository<LocationProduct>,
        private readonly utils: Utils,
        @InjectRepository(Cancellation)
        private readonly cancellationRepository: Repository<Cancellation>,
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        private readonly bankAccountsService: BankAccountsService,
        private readonly codeService: CodeService
    ) { }

    async getLatestOrders(shopID: string) {
        return await this.orderRepository.find({
            where: { shop: { _id: shopID } },
            relations: ['payment'],
            order: {
                date: 'DESC',
            },
            take: 10,
            skip: 0,
            select: {
                _id: true,
                code: true,
                payment: {
                    total: true,
                },
                date: true,
                status: true,
            }
        });

    }

    async getPendingOrders(shopId: string) {
        // SELECT ORDERS THAT ARE ONLY RECEIVED OR PREPARING
        return await this.orderRepository.count({
            where: {
                shop: { _id: shopId },
                status: Or(Equal('received'), Equal('preparing')),
            }
        })
    }

    async getOrderById(code: string, shopId: string) {
        const order = await this.orderRepository.findOne({
            where: { code, shop: { _id: shopId } },
            relations: ['payment', 'client', 'products', 'location', 'cancellation'],
        });

        if (!order) {
            throw new NotFoundException('Order not found');
        }

        const secret = await this.codeService.decryptSecurityCode(order.secret)
        const bankAccount = await this.bankAccountsService.getSafeBankAccount(order.payment.account)

        return {
            ...order,
            secret,
            payment: {
                ...order.payment,
                account: `${bankAccount?.bank} - ${bankAccount?.accountNumber}`
            }
        }
    }

    async getPublicOrderByCode(code: string) {
        const order = await this.orderRepository.findOne({
            where: { code },
            relations: ['payment', 'products', 'location', 'cancellation'],
        });

        if (!order) {
            throw new Error('Order not found');
        }

        const { secret, client, ...safeOrder } = order
        return safeOrder
    }

    async getAllOrdersByShopId(shopID: string, {
        take = 10,
        skip = 0,
        code
    }: {
        take: number,
        skip: number,
        code?: string,
    }) {
        const count = await this.orderRepository.count({
            where: {
                shop: { _id: shopID },
                code: code ? ILike(`%${code}%`) : undefined
            }
        })

        const orders = await this.orderRepository.find({
            where: {
                shop: { _id: shopID },
                code: code ? ILike(`%${code}%`) : undefined
            },
            relations: ['payment'],
            order: {
                date: 'DESC',
            },
            take,
            skip,
            select: {
                _id: true,
                code: true,
                payment: {
                    total: true,
                },
                date: true,
                status: true,
            }
        });

        return {
            entities: orders,
            next: orders.length === take ? skip + take : null,
            previous: skip - take >= 0 ? skip - take : null,
            page: Math.ceil(skip / take) + 1,
            hasMore: count > skip + take,
            totalPages: Math.ceil(count / take)
        }
    }

    async getAllOrdersByShopIdToPrint(shopID: string, {
        // take = 10,
        // skip = 0,
        code,
        status,
        client,
        pendingPayment,
        date,
        total
    }: {
        // take: number,
        // skip: number,
        code?: string,
        status?: string,
        client?: string,
        pendingPayment?: boolean,
        date?: string,
        total?: string
    }) {

        const where = {
            shop: { _id: shopID },
        } as any

        if (status !== 'all') {
            where['status'] = ILike(`%${status}%`)
        }

        return await this.orderRepository.find({
            where,
            relations: ['payment', 'client'],
            order: {
                date: 'DESC',
            },
            // take,
            // skip,
            select: {
                _id: true,
                code: !!code,
                payment: {
                    total: !!total,
                    pendingPayment: !!pendingPayment,
                },
                client: {
                    name: !!client,
                },
                date: !!date,
                status: !!status,
            }
        });
    }

    async count(shopId: string) {
        return await this.orderRepository.countBy({
            shop: { _id: shopId },
        })
    }

    create(payload: DeepPartial<Order>) {
        return this.orderRepository.create(payload)
    }

    async save(order: Order) {
        return await this.orderRepository.save(order)
    }

    async remove(id: string) {
        return await this.orderRepository.delete({ _id: id })
    }

    async update(id: string, payload: Partial<Order>) {
        return await this.orderRepository.update({ _id: id }, payload)
    }

    /**
     * @deprecated
     */
    async createOrder(payload: {
        cart: ProductOrder[],
        productsFrom: string,
        client: string,
        location: string,
        paymentMethod: {
            type: 'cash' | 'card' | 'transfer' | 'pending',
            account?: string
        },
        advance: number,
        cost?: number
    }, shop: Shop) {

        const totalOrders = await this.orderRepository.countBy({
            shop: { _id: shop._id },
        })

        const client = await this.clientRepository.findOne({
            where: { name: Like(`%${payload.client}%`), shop: { _id: shop._id } }
        })

        if (!client) {
            throw new Error('Client not found');
        }

        const location = {
            _id: payload.location
        }

        // GENERATE THE ORDER CODE
        const code = generateCode(client.name, shop.name, totalOrders)

        // CREATE THE ORDER_PRODUCTS
        const shoppingCart = payload.cart.map((product) => ({
            ...product,
            _id: randomUUID(),
        }))

        // SAVE THE ORDER_PRODUCTS
        const orderProducts = shoppingCart.map((product) =>
            this.productOrderRepository.save(product),
        );
        await Promise.all(orderProducts);

        // CREATE THE PAYMENT
        const payment = this.paymentRepository.create({
            _id: randomUUID(),
            account: payload.paymentMethod.account,
            advance: payload.advance ?? 0,
            paymentMethod: payload.paymentMethod.type,
            total: shoppingCart.reduce((acc, product) => {
                return acc + (product.price * product.quantity);
            }, 0),
            cost: payload.cost ?? 0,
            date: new Date(),
            shop,
        })

        // SAVE THE PAYMENT
        try {
            await this.paymentRepository.save({
                ...payment,
                pendingPayment: payment.total - payment.advance,
            });
        }
        catch (error) {
            console.log('error', error)
            const orderProducts = shoppingCart.map((product) =>
                this.productOrderRepository.delete({ _id: product._id }),
            );
            await Promise.all(orderProducts);
            console.log('error', error)
            throw new Error(error);
        }

        // CREATE THE ORDER
        const order = this.orderRepository.create({
            _id: randomUUID(),
            client: client,
            location,
            shop,
            date: new Date(),
            code,
            status: 'received',
            payment,
            products: shoppingCart,
            secret: generateSecurityCode()
        })

        // SAVE THE ORDER
        try {
            await this.orderRepository.save(order);
            await this.clientRepository.update({ _id: client._id }, { purchases: client.purchases + 1 });
        }
        catch (error) {
            await this.paymentRepository.delete({ _id: payment._id });
            const orderProducts = shoppingCart.map((product) =>
                this.productOrderRepository.delete({ _id: product._id }),
            );
            await Promise.all(orderProducts);
            throw new Error(error);
        }

        // UPDATE THE PRODUCT STOCK FROM THE LOCATION PRODUCTS ARE
        const productsFrom = await this.locationRepository.findOne({
            where: { _id: payload.productsFrom }
        })

        if (!productsFrom) {
            throw new Error('Location not found');
        }

        try {
            for (const product of payload.cart) {
                // FIND THE PRODUCT IN THE LOCATION
                const productLocation = await this.locationProductRepository.findOne({
                    where: {
                        productId: product.productId,
                        locationId: productsFrom._id,
                    },
                });
                if (!productLocation) {
                    throw new Error('Product not found');
                }
                // UPDATE THE PRODUCT STOCK IN THE LOCATION
                const locationStock = (productLocation.stock -= product.quantity);
                await this.locationProductRepository.update(
                    { _id: productLocation._id },
                    { stock: locationStock },
                );
                // FIND THE PRODUCT IN THE SHOP
                const productBase = await this.productRepository.findOne({
                    where: { _id: product.productId },
                });
                if (!productBase) {
                    throw new Error('Product not found');
                }
                // UPDATE THE PRODUCT STOCK IN THE SHOP
                const productStock = (productBase.stock -= product.quantity);
                await this.productRepository.update(
                    { _id: product.productId },
                    { stock: productStock, totalSales: productBase.totalSales + product.quantity },
                );
            }
        }
        catch (error) {
            await this.orderRepository.delete({ _id: order._id });
            await this.paymentRepository.delete({ _id: payment._id });
            const orderProducts = shoppingCart.map((product) =>
                this.productOrderRepository.delete({ _id: product._id }),
            );
            await Promise.all(orderProducts);
            throw new Error(error);
        }

        return order
    }

    /**
     * @deprecated
     */
    async updateOrder(payload: Partial<Order>, _id: string) {
        try {
            const order = await this.orderRepository.findOne({
                where: {
                    _id
                },
                relations: ['payment'],
                select: {
                    payment: {
                        _id: true,
                        advance: true,
                        pendingPayment: true,
                        total: true,
                    }
                }
            })
            if (!order) {
                throw new Error('Order not found');
            }
            if (payload.status === 'completed') {
                await this.paymentRepository.update({ _id: order.payment._id }, {
                    pendingPayment: 0
                });
            }
            else {
                await this.paymentRepository.update({ _id: order.payment._id }, {
                    pendingPayment: order.payment.total - order.payment.advance
                });
            }
            return await this.orderRepository.update({ _id }, {
                status: payload.status,
            });
        }
        catch (error) {
            console.log('error', error)
            throw new Error(error);
        }
    }

    /**
     * @deprecated
     */
    async cancelOrder(cancellation: Omit<Cancellation, 'date' | '_id'>, shopId: string) {
        const order = await this.orderRepository.findOne({
            where: { _id: cancellation.entityId, shop: { _id: shopId } },
            relations: ['client', 'location', 'cancellation', 'products', 'payment']
        })
        if (!order) {
            throw new Error('Order not found');
        }
        const cancellationId = randomUUID();
        const newCancellation = this.cancellationRepository.create({
            ...cancellation,
            _id: cancellationId,
            date: new Date(),
        })
        await this.cancellationRepository.save(newCancellation);
        order.cancellation = newCancellation;
        order.status = 'cancelled';
        await this.orderRepository.save(order);
        const { _id, name, username } = order.cancellation.by;
        return {
            ...order,
            cancellation: {
                ...order.cancellation,
                by: { _id, name, username },
            },
        }
    }
}
