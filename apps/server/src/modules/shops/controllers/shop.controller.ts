import { Cookies } from '@/server/decorators';
import { Image, PublicPage, SaveUser } from '@/server/entities';
import { ResponseInterceptor } from '@/server/interceptors';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import {
    Body,
    Controller,
    ForbiddenException,
    Get,
    Headers,
    Param,
    Post,
    Put,
    Query,
    Req,
    Res,
    UseInterceptors,
} from '@nestjs/common';
import { ApiAcceptedResponse, ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { ShopService } from '../services';

@ApiTags('shops')
@Controller('shops')
export class ShopController {
    constructor(
        private readonly shopsService: ShopService,
        private readonly utils: Utils,
        private readonly tokenService: TokenService,
        private readonly authService: AuthService,
    ) { }

    @Get('name')
    async getAllShops(
        @Res() res: Response,
        @Headers('authorization') auth: string,
        @Cookies('session') session: string,
        @Query() query: {
            auth: 'headers'
        }) {
        let user: SaveUser | null = null
        if (query.auth === 'headers') {
            user = this.tokenService.decode(auth);
        }
        else {
            user = this.authService.decodeCookie(session);
        }
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const imageUrl = await this.shopsService.getShopImage(user.shop._id);
        const shopName = Promise.resolve({
            _id: user.shop._id,
            shopName: user.shop.name,
            username: user.username,
            logo: imageUrl,
            showroom: {
                isPublic: user.shop?.virtualShowroom?.isPublic ?? false,
                url: user.shop?.virtualShowroom?.url ?? '',
            }
        });
        return this.utils.adaptResponse(shopName, res);
    }

    @UseInterceptors(new ResponseInterceptor())
    @ApiCookieAuth('session')
    @ApiAcceptedResponse({
        type: String,
        example: 'https://cdn.kristall.app/dawoddaw.webp',
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