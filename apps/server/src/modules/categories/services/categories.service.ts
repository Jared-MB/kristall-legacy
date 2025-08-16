import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CriteriaDto } from 'src/dtos/update-criteria.dto';
import { Context } from 'src/interfaces/context';
import { ILike, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { CategoryDetail } from '../interfaces';
import { Category } from '../models/category.model';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoriesService {

    constructor(
        /**@deprecated */
        @InjectRepository(Category)
        private deprecatedCategoryRepository: Repository<Category>,
        private readonly categoryRepository: CategoryRepository
    ) { }

    private async categoryExists(criteria: Omit<CriteriaDto, '_id'>, name: string): Promise<Category | null> {
        const category = await this.categoryRepository.findOne({
            shop: {
                _id: criteria.shopId
            },
            name: name
        });

        return category
    }

    public async getPublicCategories(shopName: string){
        const URL = `https://${shopName}.kristall.app`

        const categories = await this.deprecatedCategoryRepository.find({
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
        const categories = await this.deprecatedCategoryRepository.find({
            where: { shop: { _id: shopId }, isActive: 1 },
        })
        return categories;
    }

    private async categoryDetail(criteria: CriteriaDto): Promise<CategoryDetail | null>{
        const query = await this.categoryRepository.unsafe_repository().createQueryBuilder('category')
            .select('category.name', 'name')
            .addSelect('category._id', '_id')
            .addSelect('category.isActive', 'isActive')
            .addSelect('COUNT(product._id)', 'count')
            .leftJoin('category.products', 'product')
            .where('category.shop._id = :shopId', { shopId: criteria.shopId })
            .andWhere('category._id = :id', { id: criteria._id })
            .groupBy('category.name, category._id')
            .getRawOne();

        return query;
    }

    public async getCategoriesDetails(shopId: string): Promise<CategoryDetail[]> {
        const categories = await this.categoryRepository.unsafe_repository().createQueryBuilder('category')
            .select('category.name', 'name')
            .addSelect('category._id', '_id')
            .addSelect('category.isActive', 'isActive')
            .addSelect('COUNT(product._id)', 'count')
            .leftJoin('category.products', 'product')
            .where('category.shop._id = :shopId', { shopId })
            .groupBy('category.name, category._id')
            .orderBy('category.isActive', 'DESC')
            .getRawMany();

        return categories;
    }

    public async save(category: CreateCategoryDto, {
        shopId
    }: Context) {
        const existingCategory = await this.categoryExists({ shopId }, category.name);
        if (existingCategory) throw new BadRequestException('Ya existe una categoría con el mismo nombre')

        const newCategory = await this.categoryRepository.save({
            ...category,
            shop: {
                _id: shopId
            }
        });
        return newCategory;
    }

    public async update(criteria: CriteriaDto, category: UpdateCategoryDto) {
        if (criteria._id !== category._id) throw new BadRequestException("Criteria _id's mismatch")
        if (category.isActive !== 0 && category.isActive !== 1) throw new BadRequestException("Invalid isActive value")
       
        const existingCategory = await this.categoryExists(criteria, category.name);
        const isActiveChanged = category.isActive !== existingCategory?.isActive;

        if (existingCategory && !isActiveChanged) {
            throw new BadRequestException('Ya existe una categoría con el mismo nombre')
        }

        await this.categoryRepository.update({
            _id: criteria._id,
            shopId: criteria.shopId
        }, {
            name: category.name,
            isActive: category.isActive
        })
        return category
    }

    public async delete(criteria: CriteriaDto) {
        const category = await this.categoryDetail(criteria)
        if (!category) throw new NotFoundException()

        const productsInCategory = Number.parseInt(category.count)
        if (!Number.isNaN(productsInCategory) && productsInCategory > 0) {
            throw new BadRequestException('No se puede eliminar una categoría con productos')
        }
        
        await this.categoryRepository.hardDelete({
            _id: criteria._id,
            shopId: criteria.shopId
        })
    }
}
