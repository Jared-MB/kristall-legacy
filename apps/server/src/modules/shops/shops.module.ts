import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsModule } from '@kristall/server/src/locations/locations.module';
import { CategoriesModule, ProductsModule } from '@kristall/server/src/modules';

import { ShopController, ShopPublicController } from './controllers';

import { TokenService, Utils } from '@kristall/server/src/utilities';
import { ShopPublicService, ShopService } from './services';

import { Image, PublicPage, Shop } from '@kristall/server/src/entities';

import { Setting } from '@kristall/server/src/modules/settings/models';
import { SettingsService } from '@kristall/server/src/modules/settings/services';
import { AuthService } from '@kristall/server/src/services';

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
