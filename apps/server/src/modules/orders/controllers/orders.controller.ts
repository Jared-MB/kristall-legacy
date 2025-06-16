import { ClientsService } from '@/server/clients/clients.service';
import { Cookies } from '@/server/decorators';
import { Public } from '@/server/decorators/public.decorator';
import { Cancellation, Order } from '@/server/entities';
import { ResponseInterceptor } from '@/server/interceptors';
import { LocationProductService, ProductsService } from '@/server/modules/products/services';
import { AuthService, PaymentService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { randomUUID } from 'node:crypto';
import { AuthRequest } from 'src/interfaces/requests';
import { LocationsService } from 'src/modules/locations/services/locations.service';
import { ShopRepository } from 'src/modules/shops/repositories/shop.repository';
import { CreateOrderDto } from '../dtos';
import { CodeService, OrdersService, ProductOrderService } from '../services';

@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly clientsService: ClientsService,
        private readonly paymentService: PaymentService,
        private readonly locationsService: LocationsService,
        private readonly locationProductService: LocationProductService,
        private readonly productService: ProductsService,
        private readonly productOrderService: ProductOrderService,
        private readonly utils: Utils,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
        private readonly codeService: CodeService,
        private readonly shopRepository: ShopRepository
    ) { }

    @Get()
    async getAllOrdersByShopId(
        @Res() res: Response,
        @Req() req: Request,
        @Query() query: {
            take: number,
            skip: number,
            code?: string
        } = { take: 10, skip: 0 },
    ) {

        const cookie = req.cookies['session']
        const payload = this.tokenService.decodeCookie(cookie)
        if (!payload) {
            return res.status(404).json({ message: 'No route found' })
        }

        const orders = this.ordersService.getAllOrdersByShopId(
            payload.shop._id, {
            take: query.take,
            skip: query.skip,
            code: query.code
        }
        );
        return this.utils.adaptResponse(orders, res);
    }

    @Get('latest')
    async getLatestOrders(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const cookie = req.cookies['session']
        const payload = this.tokenService.decodeCookie(cookie)
        if (!payload) {
            return res.status(404).json({ message: 'No route found' })
        }
        const orders = this.ordersService.getLatestOrders(payload.shop._id)
        return this.utils.adaptResponse(orders, res)
    }

    @Get('pending')
    async getPendingOrders(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        const cookie = req.cookies['session']
        const payload = this.tokenService.decodeCookie(cookie)
        if (!payload) {
            return res.status(404).json({ message: 'No route found' })
        }
        const orders = this.ordersService.getPendingOrders(payload.shop._id)
        return this.utils.adaptResponse(orders, res)
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('/:code')
    async getOrderById(
        @Param() param: { code: string },
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        return await this.ordersService.getOrderById(param.code, user.shop._id);
    }

    @UseInterceptors(ResponseInterceptor)
    @Patch('delivery')
    async delivery(
        @Body() body: { secret: string },
        @Cookies('session') session: string,
        @Query() query: { code: string }
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const order = await this.ordersService.getOrderById(query.code, user.shop._id);
        if (!order) {
            throw new NotFoundException()
        }

        const isSecretValid = await this.codeService.verifySecurityCode(body.secret, order.secret)
        if (!isSecretValid) {
            throw new BadRequestException()
        }

        const orderUpdate: Partial<Order> = {
            status: 'completed'
        }

        await this.ordersService.update(order._id, orderUpdate);
        return 'ok'
    }

    @Public()
    @Get('public/:code')
    async getPublicOrderByCode(
        @Param() param: { code: string },
    ) {
        const order = this.ordersService.getPublicOrderByCode(param.code);
        return order;
    }

    @Get('print')
    async getAllOrdersByShopIdToPrint(
        @Res() res: Response,
        @Req() req: Request,
        @Query() query: {
            // take: number,
            // skip: number,
            code?: string,
            status?: string,
            client?: string,
            pendingPayment?: boolean,
            date?: string,
            total?: string
        },
        @Headers('authorization') auth: string,
        // = { take: 10, skip: 0 },
    ) {

        // const cookie = req.cookies['session']
        // console.log('cookie', cookie)
        const payload = this.tokenService.decode(auth)
        if (!payload) {
            return res.status(404).json({ message: 'No route found' })
        }

        const orders = this.ordersService.getAllOrdersByShopIdToPrint(
            payload.shop._id, {
            // take: query.take,
            // skip: query.skip,
            code: query.code,
            status: query.status,
            client: query.client,
            pendingPayment: query.pendingPayment,
            date: query.date,
            total: query.total
        }
        );
        return this.utils.adaptResponse(orders, res);
    }

    @UseInterceptors(new ResponseInterceptor())
    @Post('create-order')
    async createOrder(
        @Body() body: CreateOrderDto,
        @Req() req: AuthRequest,
    ) {
        const shop = await this.shopRepository.findOne(req.user.shop._id)

        if (!shop) {
            throw new BadRequestException()
        }

        const client = await this.clientsService.getByName(body.client, shop._id)

        if (!client) {
            throw new BadRequestException()
        }

        // PRODUCT-ORDER

        const shoppingCart = body.cart.map((product) => ({
            ...product,
            _id: randomUUID(),
        }))

        const orderProducts = shoppingCart.map((product) =>
            this.productOrderService.save(product)
        )
        await Promise.all(orderProducts)

        // PAYMENT

        const total = shoppingCart.reduce((acc, product) => {
            return acc + (product.price * product.quantity);
        }, 0)

        const payment = this.paymentService.create({
            _id: randomUUID(),
            account: body.paymentMethod.account,
            advance: body.advance ?? 0,
            paymentMethod: body.paymentMethod.type,
            total: total,
            cost: body.cost ?? 0,
            date: new Date(),
            shop: shop,
        })

        try {
            await this.paymentService.save(payment)
        }
        catch (err) {
            console.log(err)
            const orderProducts = shoppingCart.map((product) =>
                this.productOrderService.remove(product._id)
            )
            await Promise.all(orderProducts)
            throw new InternalServerErrorException()
        }

        // ORDER

        const location = {
            _id: body.location
        }

        const totalOrders = await this.ordersService.count(shop._id)

        const code = this.codeService.generate(client.name, shop.name, totalOrders)
        const secret = await this.codeService.generateSecurityCode()

        const order = this.ordersService.create({
            _id: randomUUID(),
            client: client,
            location: location,
            shop: shop,
            date: new Date(),
            code: code,
            status: 'received',
            payment: payment,
            products: shoppingCart,
            secret: secret
        })

        try {
            await this.ordersService.save(order)
            await this.clientsService.incrementPurchases(client._id)
        }
        catch (err) {
            console.log(err)
            await this.paymentService.remove(payment._id)
            const orderProducts = shoppingCart.map((product) =>
                this.productOrderService.remove(product._id)
            )
            await Promise.all(orderProducts)
            throw new InternalServerErrorException()
        }

        // UPDATE THE PRODUCT STOCK FROM THE LOCATION PRODUCTS ARE
        const productsFrom = await this.locationsService.getLocation(body.productsFrom, false)
        if (!productsFrom) {
            throw new BadRequestException()
        }

        try {
            for (const product of body.cart) {
                // FIND THE PRODUCT IN THE LOCATION
                const productLocation = await this.locationProductService.findByLocationId(productsFrom._id, product.productId)
                if (!productLocation) {
                    throw new Error('Product not found');
                }
                // UPDATE THE PRODUCT STOCK IN THE LOCATION
                const locationStock = (productLocation.stock -= product.quantity);
                await this.locationProductService.update(
                    productLocation._id,
                    { stock: locationStock },
                );
                // FIND THE PRODUCT IN THE SHOP
                const productBase = await this.productService.getProductById(product.productId, shop._id);
                if (!productBase) {
                    throw new Error('Product not found');
                }
                // UPDATE THE PRODUCT STOCK IN THE SHOP
                const productStock = (productBase.stock -= product.quantity);
                await this.productService.update(
                    product.productId,
                    { stock: productStock, totalSales: productBase.totalSales + product.quantity },
                );
            }
        }
        catch (err) {
            console.log(err)
            await this.ordersService.remove(order._id)
            await this.paymentService.remove(payment._id)
            const orderProducts = shoppingCart.map((product) =>
                this.productOrderService.remove(product._id)
            )
            await Promise.all(orderProducts);
            throw new InternalServerErrorException()
        }

        return order
    }

    @Put('cancel')
    async cancelOrder(
        @Body() body: Omit<Cancellation, 'date' | '_id'>,
        @Headers() headers: { authorization: string },
        @Res() res: Response,
    ) {
        const shop = this.tokenService.getShop(headers.authorization);
        if (!shop) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const order = this.ordersService.cancelOrder(body, shop._id);
        return this.utils.adaptResponse(order, res);
    }

    @Put('update-order/:id')
    async updateOrder(
        @Body() body: Partial<Order>,
        @Res() res: Response,
        @Param() param: { id: string },
    ) {
        const order = this.ordersService.updateOrder(body, param.id);
        return this.utils.adaptResponse(order, res);
    }
}
