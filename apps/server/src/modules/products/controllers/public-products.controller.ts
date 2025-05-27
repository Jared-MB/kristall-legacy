import { Public } from '@/server/decorators/public.decorator';
import { ShopService } from '@/server/modules/shops/services';
import { Controller, Get, NotFoundException, Param, Query, UseInterceptors } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptors';
import { PublicProductsService, type QueryProduct } from '../services';

@Public()
@Controller('public-products')
export class PublicProductsController {

    constructor(
        private readonly publicProductsService: PublicProductsService,
        private readonly shopsService: ShopService
    ) { }

    @UseInterceptors(ResponseInterceptor)
    @Get(':shopName')
    async getProducts(@Param('shopName') shopName: string, @Query() query: QueryProduct) {
        const shop = await this.shopsService.getByVirtualShowroomName(shopName)
        if (!shop?.virtualShowroom?.isPublic) {
            throw new NotFoundException(`${shopName} is not found`)
        }

        const parsedQuery: QueryProduct = {
            ...query,
            "sort-by": query['sort-by'] ?? "best-sellers",
        }
        const response = await this.publicProductsService.getProducts(shop._id, parsedQuery)
        return response
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('best-sellers/:shopName')
    async getBestSellers(@Param('shopName') shopName: string) {
        const shop = await this.shopsService.getByVirtualShowroomName(shopName)
        if (!shop?.publicPage?.isPublic) {
            throw new NotFoundException()
        }
        const response = await this.publicProductsService.getBestSellers(shop._id)
        return response
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('new/:shopName')
    async getNewProducts(@Param('shopName') shopName: string) {
        const shop = await this.shopsService.getByVirtualShowroomName(shopName)
        if (!shop?.publicPage?.isPublic) {
            throw new NotFoundException()
        }
        const response = await this.publicProductsService.getNewProducts(shop._id)
        return response
    }

}
