import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { LocationProduct, ProductBatch } from '@kristall/server/src/entities';
import { CreateBatchClientDto, CreateBatchServerDto } from '../dto';

@Injectable()
export class BatchService {
    constructor(
        @InjectRepository(ProductBatch) private readonly batchRepository: Repository<ProductBatch>,
    ) { }

    private countByProductId(productId: string): Promise<number> {
        return this.batchRepository.count({
            where: {
                locationProduct: {
                    productId
                }
            }
        });
    }

    private create(batch: CreateBatchServerDto) {
        return this.batchRepository.create({
            batchNumber: batch.batchNumber,
            expirationDate: new Date(batch.expirationDate),
            locationProduct: batch.locationProduct,
            stock: batch.stock,
        })
    }

    async createMany(batches: CreateBatchServerDto[]): Promise<ProductBatch[]> {
        const count = await this.countByProductId(batches[0].locationProduct.productId);
        return batches.map((batch, index) => this.create({
            ...batch,
            batchNumber: count + index + 1
        }))
    }

    addLocationsProducts(locationsProducts: LocationProduct[], batches: CreateBatchClientDto[]) {
        return batches.map(batch => {
            const locationProduct = locationsProducts.find(lp => lp.locationId === batch.locationProduct.locationId)
            if (!locationProduct) {
                throw new Error('Location not found');
            }
            return {
                ...batch,
                locationProduct
            }
        })
    }

    saveMany(batches: ProductBatch[]) {
        return this.batchRepository.save(batches);
    }

    getByProductId(productId: string) {
        return this.batchRepository.find({
            where: {
                locationProduct: {
                    productId
                }
            },
            relations: ['locationProduct'],
        })
    }

    removeMany(batches: ProductBatch[]) {
        return this.batchRepository.remove(batches);
    }

    // getBatches(shopId: string, toDate: Date){
    //     return this.batchRepository.find({
    //         where: {
    //             locationProduct: {
    //                 productId: {

    //                 }
    //             },
    //             expirationDate: {
    //                 $lte: toDate
    //             }
    //         }
    //     })
    // }
}
