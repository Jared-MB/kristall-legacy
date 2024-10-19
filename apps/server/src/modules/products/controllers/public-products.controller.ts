import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { ShopService } from 'src/modules/shops/services';
import { PublicProductsService } from '../services';

@Public()
@Controller('public-products')
export class PublicProductsController {

    constructor(
        private readonly publicProductsService: PublicProductsService,
        private readonly shopsService: ShopService
    ) { }

    @Get('best-sellers/:shopName')
    async getBestSellers(@Param('shopName') shopName: string) {
        const shop = await this.shopsService.getByVirtualShowroomName(shopName)
        if (!shop?.publicPage.isPublic) {
            throw new NotFoundException()
        }
        const response = await this.publicProductsService.getBestSellers(shop._id)
        return response
    }

    @Get('new/:shopName')
    async getNewProducts(@Param('shopName') shopName: string) {
        const shop = await this.shopsService.getByVirtualShowroomName(shopName)
        if (!shop?.publicPage.isPublic) {
            throw new NotFoundException()
        }
        const response = await this.publicProductsService.getNewProducts(shop._id)
        return response
    }

}
