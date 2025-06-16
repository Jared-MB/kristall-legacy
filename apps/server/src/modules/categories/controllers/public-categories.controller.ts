import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/decorators';
import { ResponseInterceptor } from 'src/interceptors';
import { CategoriesService } from '../services/categories.service';

@Public()
@UseInterceptors(ResponseInterceptor)
@Controller('public-categories')
export class PublicCategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService,
    ) { }

    @Get(':shopName')
    async getCategories(@Param() params: { shopName: string }){
        return this.categoriesService.getPublicCategories(params.shopName);
    }
}
