import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsModule } from 'src/locations/locations.module';
import { CategoriesModule, ProductsModule } from 'src/modules';

import { ShopController, ShopPublicController } from './controllers';

import { TokenService, Utils } from 'src/utilities';
import { ShopPublicService, ShopService } from './services';

import { Image, PublicPage, Shop } from 'src/entities';

import { Setting } from 'src/modules/settings/models';
import { SettingsService } from 'src/modules/settings/services';
import { AuthService } from 'src/services';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop, Image, PublicPage, Setting]),
        LocationsModule,
        ProductsModule,
        CategoriesModule
    ],
    providers: [ShopService, ShopPublicService, Utils, TokenService, SettingsService, AuthService],
    controllers: [ShopController, ShopPublicController],
    exports: [ShopService]
})
export class ShopsModule { }
