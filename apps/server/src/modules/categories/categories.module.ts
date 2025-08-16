import { Product } from '@/server/entities';
import { AuthService } from '@/server/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriesController } from './controllers/categories.controller';
import { PublicCategoriesController } from './controllers/public-categories.controller';

import { Category } from './models/category.model';

import { CategoryRepository } from './repositories/category.repository';
import { CategoriesService } from './services/categories.service';

@Module({
    imports: [TypeOrmModule.forFeature([Category, Product])],
    providers: [CategoriesService, AuthService, CategoryRepository],
    controllers: [CategoriesController, PublicCategoriesController],
    exports: [CategoriesService]
})
export class CategoriesModule { }
