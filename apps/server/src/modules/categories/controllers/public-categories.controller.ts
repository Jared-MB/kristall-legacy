import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { Public } from 'src/decorators';
import { ResponseInterceptor } from 'src/interceptors';
import { CategoriesService } from '../services/categories.service';

@Controller('public-categories')
export class PublicCategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService,
    ) { }


    @Public()
    @UseInterceptors(ResponseInterceptor)
    @Get(':shopName')
    async getCategories(@Param() params: { shopName: string }){
        console.log(params);
        return this.categoriesService.getPublicCategories(params.shopName);
    }

}
