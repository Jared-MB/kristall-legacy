import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule, ShopsModule } from '@/server/modules';

import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import { BatchService, LocationProductService, ProductsService, PublicProductsService } from './services';

import { DeliveryLocation, Image, Location, LocationProduct, Product, ProductBatch, Shop } from '@/server/entities';

import { InventoryController } from './controllers/inventory.controller';
import { ProductsController } from './controllers/products.controller';
import { PublicProductsController } from './controllers/products.public.controller';

import { LocationsModule } from '../locations/locations.module';
import { LocationProductRepository } from './repositories/location-product.repository';
import { ProductRepository } from './repositories/product.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, LocationProduct, Image, Location, DeliveryLocation, ProductBatch, Shop]),
        ImageModule,
        forwardRef(() => ShopsModule),
        LocationsModule,
    ],
    controllers: [ProductsController, PublicProductsController, InventoryController],
    providers: [
        ProductsService,
        Utils,
        TokenService,
        BatchService,
        LocationProductService,
        AuthService,
        PublicProductsService,
        ProductRepository,
        LocationProductRepository
    ],
    exports: [ProductsService, LocationProductService],
})
export class ProductsModule { }