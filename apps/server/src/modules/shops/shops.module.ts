import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesModule, ProductsModule } from '@/server/modules';
import { LocationsModule } from 'src/modules/locations/locations.module';

import { ShopController, ShopPublicController } from './controllers';

import { TokenService, Utils } from '@/server/utilities';
import { ShopPublicService, ShopService } from './services';

import { Image, PublicPage, Shop } from '@/server/entities';

import { Setting } from '@/server/modules/settings/models';
import { SettingsService } from '@/server/modules/settings/services';
import { AuthService } from '@/server/services';
import { CacheService } from 'src/services/cache.service';
import { ShopRepository } from './repositories/shop.repository';

/**
 * Injected here to avoid circular dependencies with the locations module
 */
import { PublicLocationsController } from '../locations/controllers/locations.public.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Shop, Image, PublicPage, Setting]),
        LocationsModule,
        CategoriesModule,
        forwardRef(() => ProductsModule),
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
    controllers: [ShopController, ShopPublicController, PublicLocationsController],
    exports: [ShopService, ShopRepository]
})
export class ShopsModule { }
