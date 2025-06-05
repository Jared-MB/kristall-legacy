import { Cookies } from '@/server/decorators';
import { Image, PublicPage } from '@/server/entities';
import { ResponseInterceptor } from '@/server/interceptors';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Headers,
    NotFoundException,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseInterceptors
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { AuthRequest } from 'src/interfaces/requests';
import { ShopRepository } from '../repositories/shop.repository';
import { ShopService } from '../services';

@ApiTags('shops')
@Controller('shops')
export class ShopController {
    constructor(
        private readonly shopsService: ShopService,
        private readonly shopRepository: ShopRepository,
        private readonly utils: Utils,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
    ) { }

    @UseInterceptors(ResponseInterceptor)
    @Get('name')
    async getShop(
        @Req() req: AuthRequest,
    ) {
        const { user } = req
        const shop = await this.shopRepository.findOne(user.shop._id);

        if (!shop){
            throw new NotFoundException()
        }

        return {
            _id: shop._id,
            shopName: shop.name,
            username: user.username,
            logo: shop.image.url,
            showroom: {
                isPublic: shop?.virtualShowroom?.isPublic ?? false,
                url: shop?.virtualShowroom?.url ?? '',
            }
        }
    }

    @UseInterceptors(new ResponseInterceptor())
    @ApiCookieAuth('session')
    @ApiAcceptedResponse({
        type: String,
        example: 'https://cdn.kristall.app/image.webp',
    })
    @Get('image')
    async getImage(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session);
        if (!user) {
            throw new ForbiddenException()
        }

        return this.shopsService.getShopImage(user.shop._id);
    }

    @Get(':id')
    async getShopById(@Param() param: { id: string }, @Res() res: Response) {
        const shop = this.shopsService.getShopById(param.id);
        return this.utils.adaptResponse(shop, res);
    }

    @Put('public-page')
    async updatePublicPage(
        @Headers('authorization') token: string,
        @Body() body: PublicPage,
        @Res() res: Response,
    ) {
        const payload = this.tokenService.decode(token);
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const shopId = payload.shop._id;
        const response = this.shopsService.updatePublicPage(body, shopId);
        return this.utils.adaptResponse(response, res);
    }

    @Post()
    async createShop(@Body() body: any, @Res() res: Response) {
        const shop = this.shopsService.createShop(body);
        return this.utils.adaptResponse(shop, res);
    }

    @Put('logo')
    async addLogoToShop(
        @Body() body: { image: Image },
        @Res() res: Response,
        @Req() req: Request,
    ) {
        const cookie = req.cookies['session'];
        const payload = this.tokenService.decodeCookie(cookie);
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const shop = this.shopsService.addLogoToShop(body.image, payload.shop);
        return this.utils.adaptResponse(shop, res);
    }
}