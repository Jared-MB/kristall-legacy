import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Product } from 'src/entities';
import { AuthService } from 'src/services';
import { TokenService, Utils } from 'src/utilities';
import { CategoriesController } from './controllers';
import { CategoriesService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesService, TokenService, Utils, AuthService],
    controllers: [CategoriesController],
    exports: [CategoriesService]
})
export class CategoriesModule { }
