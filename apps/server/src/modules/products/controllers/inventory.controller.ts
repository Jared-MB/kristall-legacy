import { Body, Controller, Post, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "src/interceptors";

import { Product } from "../models/product.model";

import { LocationProductRepository } from "../repositories/location-product.repository";
import { ProductRepository } from "../repositories/product.repository";

@Controller('inventory')
export class InventoryController {

    constructor(
        private readonly productRepository: ProductRepository, 
        private readonly locationProductRepository: LocationProductRepository
    ) { }

    @UseInterceptors(ResponseInterceptor)
    @Post('new')
    async addNewInventory(@Body() body: {products: Pick<Product, '_id' | 'stock' | 'locations' | 'name'>[]}) {
        const promises = body.products.map(async (product) => {
            const productToIncrement = this.productRepository.incrementStock(product._id, product.stock)
            const locationsToIncrement = this.locationProductRepository.incrementStock({
                productId: product._id, 
                locationId: product.locations[0].locationId
            }, product.stock)
            return await Promise.all([productToIncrement, locationsToIncrement])
        })

        await Promise.all(promises)
        
        return 'ok'
    }

}