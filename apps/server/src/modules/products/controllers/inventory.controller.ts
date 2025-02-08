import { Body, Controller, Get, NotFoundException, Post, Query, UseInterceptors } from "@nestjs/common";
import { ResponseInterceptor } from "src/interceptors";

import { Product } from "../models/product.model";

import { Cookies } from "src/decorators";
import { AuthService } from "src/services";
import { DataSource } from "typeorm";
import { LocationProductRepository } from "../repositories/location-product.repository";
import { ProductRepository } from "../repositories/product.repository";

@Controller('inventory')
export class InventoryController {

    constructor(
        private readonly productRepository: ProductRepository, 
        private readonly locationProductRepository: LocationProductRepository,
        private readonly authService: AuthService,
        private readonly dataSource: DataSource
    ) { }

    @UseInterceptors(ResponseInterceptor)
    @Get('print')
    async printInventory(@Cookies('session') session: string, @Query('location') location: string){
        const user = this.authService.decodeCookie(session)
        if (!user){
            throw new NotFoundException()
        }

        const { shop: { _id : shopId } } = user

        const products = await this.dataSource
            .getRepository('product')
            .createQueryBuilder('product')
            .innerJoin('location_product', 'location_product', 'location_product."productId" = product._id')
            .select(['product._id AS _id', 'product.name AS name', 'product.price AS price', 'location_product.stock AS stock'])
            .where('location_product."locationId" = :location', { location })
            .andWhere('product.shop_id = :shopId', { shopId })
            .getRawMany();
            
        return products;
    }

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