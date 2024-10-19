import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

import { LocationProduct } from 'src/entities';
import { CreateLocationProductDto } from '../dto';

@Injectable()
export class LocationProductService {
    constructor(
        @InjectRepository(LocationProduct) private readonly locationProductRepository: Repository<LocationProduct>,
    ) { }

    create(locationProduct: CreateLocationProductDto) {
        const _id = randomUUID();
        return this.locationProductRepository.create({
            _id,
            ...locationProduct
        });
    }

    createMany(locationProduct: CreateLocationProductDto[]) {
        return locationProduct.map(product => this.create(product))
    }

    save(locationProduct: LocationProduct) {
        return this.locationProductRepository.save(locationProduct);
    }

    saveMany(locationProduct: LocationProduct[]) {
        return this.locationProductRepository.save(locationProduct);
    }

    /**
     * Update a LocationProduct by its id
     * @param id The id of the location product
     * @param locationProduct The new data to update
     */
    update(id: string, locationProduct: Partial<LocationProduct>) {
        return this.locationProductRepository.update({
            _id: id
        }, locationProduct);
    }

    findByProductId(productId: string) {
        return this.locationProductRepository.find({
            where: {
                productId
            }
        })
    }

    /**
     * Find a location product by its location id and product id
     * @param locationId The id of the location
     * @param productId The id of the product
     * @returns The location product
     */
    findByLocationId(locationId: string, productId: string) {
        return this.locationProductRepository.findOne({
            where: [{
                locationId,
                productId
            }, {
                locationId,
                product: {
                    _id: productId
                }
            }]
        })
    }

    remove(locationProduct: LocationProduct) {
        return this.locationProductRepository.remove(locationProduct);
    }

    removeMany(locationProduct: LocationProduct[]) {
        return this.locationProductRepository.remove(locationProduct);
    }
}
