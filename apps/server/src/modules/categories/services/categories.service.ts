import { Category, Shop } from '@/server/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CategoryDetail } from '../interfaces';

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) { }

    public async getPublicCategories(shopName: string){
        const URL = `https://${shopName}.kristall.app`

        const categories = await this.categoryRepository.find({
            where: { shop: { 
                virtualShowroom: {
                    url: ILike(`%${URL}%`)
                }
            } },
            select: ['_id','name']
        })
        return categories;
    }

    public async getAllCategories(shopId: string) {
        const categories = await this.categoryRepository.find({
            where: { shop: { _id: shopId } }
        })
        return categories;
    }

    public async getCategoriesDetails(shopId: string): Promise<CategoryDetail[]> {
        const categories = await this.categoryRepository.createQueryBuilder('category')
            .select('category.name', 'name')
            .addSelect('category._id', '_id')
            .addSelect('COUNT(product._id)', 'count')
            .leftJoin('category.products', 'product')
            .where('category.shop._id = :shopId', { shopId })
            .groupBy('category.name, category._id')
            .getRawMany();

        return categories;
    }

    public async createCategory(body: Pick<Category, 'name'>, shop: Shop) {

        const categories = await this.getAllCategories(shop._id);

        const existingCategory = categories.some(category => category.name.toLowerCase() === body.name.toLowerCase());

        if (existingCategory) throw new Error('Category already exists')

        const category = this.categoryRepository.create({
            ...body,
            shop
        });
        await this.categoryRepository.save(category);
        return category;
    }

    public async updateCategory(id: string, body: Category, shop: Shop) {

        const categories = await this.getAllCategories(shop._id);

        const existingCategory = categories.some(category => category.name.toLowerCase() === body.name.toLowerCase());

        if (existingCategory) throw new Error('Category already exists')

        if (id !== body._id) throw new Error('Bad request')

        await this.categoryRepository.update(id, {
            name: body.name
        })

        return body

    }
}
