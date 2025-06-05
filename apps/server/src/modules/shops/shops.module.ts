import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsModule } from '@/server/locations/locations.module';
import { CategoriesModule, ProductsModule } from '@/server/modules';

import { ShopController, ShopPublicController } from './controllers';

import { TokenService, Utils } from '@/server/utilities';
import { ShopPublicService, ShopService } from './services';

import { Image, PublicPage, Shop } from '@/server/entities';

import { Setting } from '@/server/modules/settings/models';
import { SettingsService } from '@/server/modules/settings/services';
import { AuthService } from '@/server/services';
import { CacheService } from 'src/services/cache.service';
import { ShopRepository } from './repositories/shop.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop, Image, PublicPage, Setting]),
        LocationsModule,
        ProductsModule,
        CategoriesModule
    ],
    providers: [
        CacheService,
        ShopRepository,
        ShopService, 
        ShopPublicService, 
        Utils, 
        TokenService, 
        SettingsService, 
        AuthService
    ],
    controllers: [ShopController, ShopPublicController],
    exports: [ShopService]
})
export class ShopsModule { }
