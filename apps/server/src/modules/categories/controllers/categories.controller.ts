import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from 'src/interceptors';
import { AuthRequest } from 'src/interfaces/requests';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoriesService } from '../services/categories.service';

@UseInterceptors(ResponseInterceptor)
@UsePipes(ValidationPipe)
@Controller('categories')
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @HttpCode(200)
    @Get()
    async getAllCategories(
        @Req() req: AuthRequest,
    ) {
        const { user } = req
        return await this.categoriesService.getAllCategories(user.shop._id);
    }

    @HttpCode(200)
    @Get('details')
    async getCategoriesDetails(
        @Req() req: AuthRequest,
    ) {
        const { user } = req
        return await this.categoriesService.getCategoriesDetails(user.shop._id);
    }

    @HttpCode(201)
    @Post()
    async createCategory(
        @Body() body: CreateCategoryDto,
        @Req() req: AuthRequest,
    ) {
        const { user } = req
        return await this.categoriesService.save(body, {
            shopId: user.shop._id,
            permissions: user.permissions,
            plan: user.plan
        });
    }

    @HttpCode(200)
    @Patch(':id')
    async updateCategory(
        @Body() body: UpdateCategoryDto,
        @Req() req: AuthRequest,
        @Param() params: { id: string }
    ) {
        const { user } = req
        return await this.categoriesService.update({
            _id: params.id,
            shopId: user.shop._id
        }, body)
    }

    @HttpCode(200)
    @Delete(':id')
    async deleteCategory(
        @Req() req: AuthRequest,
        @Param() params: { id: string }
    ) {
        const { user } = req
        return await this.categoriesService.delete({
            _id: params.id,
            shopId: user.shop._id
        })
    }
}
