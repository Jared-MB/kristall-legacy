import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ImageModule, ShopsModule } from 'src/modules';

import { ProductsController, PublicProductsController } from './controllers';

import { LocationsService } from 'src/locations/locations.service';
import { AuthService } from 'src/services';
import { TokenService, Utils } from 'src/utilities';
import { BatchService, LocationProductService, ProductsService, PublicProductsService } from './services';

import { DeliveryLocation, Image, Location, LocationProduct, Product, ProductBatch, Shop } from 'src/entities';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, LocationProduct, Image, Location, DeliveryLocation, ProductBatch, Shop]),
        ImageModule,
        forwardRef(() => ShopsModule),
    ],
    controllers: [ProductsController, PublicProductsController],
    providers: [
        ProductsService,
        Utils,
        TokenService,
        LocationsService,
        BatchService,
        LocationProductService,
        AuthService,
        PublicProductsService,
    ],
    exports: [ProductsService, LocationProductService],
})
export class ProductsModule { }