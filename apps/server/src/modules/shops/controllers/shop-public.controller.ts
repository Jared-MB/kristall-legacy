import {
    Controller,
    Get,
    Param,
    Query,
    Res
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Public } from '@/server/decorators/public.decorator';
import { CategoriesService } from '@/server/modules/categories/services';
import { ProductsService } from '@/server/modules/products/services';
import { Utils } from '@/server/utilities';
import { ShopService } from '../services';

@ApiTags('shops-public')
@Public()
@Controller('shops/public')
export class ShopPublicController {
    constructor(
        private readonly shopsService: ShopService,
        private readonly productsService: ProductsService,
        private readonly categoriesService: CategoriesService,
        private readonly utils: Utils,
    ) { }

    @Get(':name/products')
    async getProductsForPublicPage(
        @Param() param: { name: string },
        @Query() query: { take: string, skip: string },
        @Res() res: Response,
    ) {
        const shop = await this.shopsService.getShopByName(param.name);
        if (!shop) {
            return res.status(404).json({ message: 'No route found' });
        }
        const products = this.productsService.getProductsForPublic(shop._id, +query.take, +query.skip);
        return this.utils.adaptResponse(products, res);
    }

    @Get(':name/products/best-sellers')
    async getBestSellersForPublicPage(
        @Param() param: { name: string },
        @Query() query: { take: string, skip: string },
        @Res() res: Response,
    ) {
        const shop = await this.shopsService.getShopByName(param.name);
        if (!shop) {
            return res.status(404).json({ message: 'No route found' });
        }
        const products = this.productsService.getBestSellersProductsForPublic(shop._id, +query.take, +query.skip);
        return this.utils.adaptResponse(products, res);
    }

    @Get(':name/products/newest')
    async getNewestProductsForPublicPage(
        @Param() param: { name: string },
        @Query() query: { take: string, skip: string },
        @Res() res: Response,
    ) {
        const shop = await this.shopsService.getShopByName(param.name);
        if (!shop) {
            return res.status(404).json({ message: 'No route found' });
        }
        const products = this.productsService.getNewestProductsForPublic(shop._id, +query.take, +query.skip);
        return this.utils.adaptResponse(products, res);
    }

    @Get(':name/config')
    async getPublicPageConfig(@Param() param: { name: string }, @Res() res: Response) {
        const shop = await this.shopsService.getShopByName(param.name);
        if (!shop) {
            return res.status(404).json({ message: 'No route found' });
        }
        const publicPage = this.shopsService.getPublicPageConfig(shop._id);
        return this.utils.adaptResponse(publicPage, res);
    }

    @Get(':name/image')
    async getShopImage(@Param() param: { name: string }, @Res() res: Response) {
        const shop = await this.shopsService.getShopByName(param.name);
        if (!shop) {
            return res.status(404).json({ message: 'No route found' });
        }
        const image = this.shopsService.getShopImage(shop._id);
        return this.utils.adaptResponse(image, res);
    }

    @Get(':name/categories')
    async getShopCategories(@Param() param: { name: string }, @Res() res: Response) {
        const shop = await this.shopsService.getShopByName(param.name);
        if (!shop) {
            return res.status(404).json({ message: 'No route found' });
        }
        const categories = this.categoriesService.getAllCategories(shop._id);
        return this.utils.adaptResponse(categories, res);
    }
}