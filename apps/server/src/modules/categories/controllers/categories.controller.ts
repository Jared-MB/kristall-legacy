import { Body, Controller, ForbiddenException, Get, InternalServerErrorException, Param, Post, Put, Req, Res, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { Cookies } from '@/server/decorators';
import { Category } from '@/server/entities';
import { ResponseInterceptor } from '@/server/interceptors';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import { CategoriesService } from '../services';

@Controller('categories')
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService,
        private readonly authService: AuthService,
        private readonly tokenService: TokenService,
        private readonly utils: Utils,
    ) { }

    @UseInterceptors(new ResponseInterceptor())
    @Get()
    async getAllCategories(
        @Cookies('session') cookie: string,
    ) {
        const user = this.authService.decodeCookie(cookie);
        if (!user) {
            throw new ForbiddenException();
        }

        try {
            return this.categoriesService.getAllCategories(user.shop._id);
        }
        catch (err) {
            throw new InternalServerErrorException()
        }
    }

    @UseInterceptors(new ResponseInterceptor())
    @Get('details')
    async getCategoriesDetails(
        @Cookies('session') cookie: string,
    ) {
        const user = this.authService.decodeCookie(cookie);
        if (!user) {
            throw new ForbiddenException();
        }

        try {
            return this.categoriesService.getCategoriesDetails(user.shop._id);
        }
        catch (err) {
            throw new InternalServerErrorException()
        }
    }

    @Post()
    async createCategory(
        @Body() body: Pick<Category, 'name'>,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        const cookie = req.cookies['session'];
        const payload = this.tokenService.decodeCookie(cookie);
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        console.log(body);
        const category = this.categoriesService.createCategory(body, payload.shop);
        return this.utils.adaptResponse(category, res);
    }

    @Put(':id')
    async updateCategory(
        @Body() body: Category,
        @Req() req: Request,
        @Res() res: Response,
        @Param() params: { id: string }
    ) {
        const cookie = req.cookies['session'];
        const payload = this.tokenService.decodeCookie(cookie);
        if (!payload) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const category = this.categoriesService.updateCategory(params.id, body, payload.shop)
        return this.utils.adaptResponse(category, res)
    }
}
