import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from '@/server/entities';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import { CategoriesController } from './controllers';
import { CategoriesService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesService, TokenService, Utils, AuthService],
    controllers: [CategoriesController],
    exports: [CategoriesService]
})
export class CategoriesModule { }
