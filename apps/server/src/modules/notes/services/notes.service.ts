import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import {
    Cancellation,
    LocationProduct,
    Note,
    Payment,
    Product,
    ProductOrder,
} from '@/server/entities';
import { Utils, generateNoNameCode } from '@/server/utilities';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService {
    constructor(
        @InjectRepository(Note) private readonly noteRepository: Repository<Note>,
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectRepository(ProductOrder)
        private readonly productOrderRepository: Repository<ProductOrder>,
        @InjectRepository(LocationProduct)
        private readonly locationProductRepository: Repository<LocationProduct>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly utils: Utils,
        @InjectRepository(Cancellation)
        private readonly cancellationRepository: Repository<Cancellation>,
    ) { }

    async getAllNotesByShopId(shopID: string, token: string) {
        await this.utils.verifyToken(token, shopID);
        return await this.noteRepository.find({
            where: { shop: { _id: shopID } },
            relations: {
                cancellation: {
                    by: true,
                },
                location: true,
                payment: true,
                products: true,
            },
            order: {
                date: 'DESC',
            },
        });
    }

    async addNote(note: Note) {
        const _id = await this.utils.generateUUID();
        const payment = this.paymentRepository.create({ ...note.payment, _id });

        const orderProductsWithId = note.products.map((product) => {
            const _id = randomUUID();
            return { ...product, _id };
        });

        const orderProducts = orderProductsWithId.map((product) =>
            this.productOrderRepository.save(product),
        );

        await Promise.all(orderProducts);

        const totalNotes = await this.noteRepository.countBy({
            shop: { _id: note.shop._id },
        });

        const code = generateNoNameCode(note.shop.name, totalNotes);
        const note_id = await this.utils.generateUUID();
        note.products = orderProductsWithId;
        note.payment = payment;
        const noteCreated = this.noteRepository.create({
            ...note,
            _id: note_id,
            code,
        });

        await this.paymentRepository.save(payment);
        await this.noteRepository.save(noteCreated);

        for (const product of note.products) {
            const productLocation = await this.locationProductRepository.findOne({
                where: {
                    productId: product.productId,
                    locationId: note.location._id,
                },
            });
            if (!productLocation) {
                throw new Error('Product not found');
            }
            const locationStock = (productLocation.stock -= product.quantity);
            await this.locationProductRepository.update(
                { _id: productLocation._id },
                { stock: locationStock },
            );
            const productBase = await this.productRepository.findOne({
                where: { _id: product.productId },
            });
            if (!productBase) {
                throw new Error('Product not found');
            }
            const productStock = (productBase.stock -= product.quantity);
            await this.productRepository.update(
                { _id: product.productId },
                { stock: productStock, totalSales: productBase.totalSales + product.quantity },
            );
        }

        return noteCreated;
    }

    async cancelNote(cancellation: Omit<Cancellation, 'date' | '_id'>, shopId: string) {
        const note = await this.noteRepository.findOne({
            where: { _id: cancellation.entityId, shop: { _id: shopId } },
            relations: ['products', 'payment', 'location', 'cancellation'],
        });
        if (!note) {
            throw new Error('Note not found');
        }
        const cancellationId = randomUUID();
        const newCancellation = this.cancellationRepository.create({
            ...cancellation,
            _id: cancellationId,
            date: new Date(),
        });
        await this.cancellationRepository.save(newCancellation);
        note.cancellation = newCancellation;
        await this.noteRepository.save(note);
        const { _id, name, username } = note.cancellation.by;
        return {
            ...note,
            cancellation: {
                ...note.cancellation,
                by: { _id, name, username },
            },
        }
    }
}
