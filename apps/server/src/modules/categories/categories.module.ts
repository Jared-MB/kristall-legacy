import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@/server/entities';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import { CategoriesController } from './controllers';
import { CategoriesService } from './services';
import { PublicCategoriesController } from './controllers/public-categories.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesService, TokenService, Utils, AuthService],
    controllers: [CategoriesController, PublicCategoriesController],
    exports: [CategoriesService]
})
export class CategoriesModule { }
