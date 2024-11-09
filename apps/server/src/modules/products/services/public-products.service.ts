import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '@/server/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PublicProductsService {

    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    async getBestSellers(shopId: string) {
        return await this.productRepository.find({
            where: {
                shop: { _id: shopId },
            },
            relations: ['image', 'category'],
            order: {
                totalSales: 'DESC',
            },
            take: 10,
            skip: 0,
        });
    }

    async getNewProducts(shopId: string) {
        return await this.productRepository.find({
            where: {
                shop: { _id: shopId },
            },
            relations: ['image', 'category'],
            order: {
                createdAt: 'DESC',
            },
            take: 10,
            skip: 0,
        });
    }

}
