import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CriteriaDto } from "src/dtos/update-criteria.dto";
import { RawRepository } from "src/interfaces/raw-repository";
import { DeepPartial, Repository } from "typeorm";
import { Category } from "../models/category.model";

@Injectable()
export class CategoryRepository implements RawRepository<Category> {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    public async find(data: DeepPartial<Category>): Promise<Category[]> {
        return this.categoryRepository.find({
            where: {
                _id: data?._id,
                shop: {
                    _id: data?.shop?._id
                },
                name: data?.name,
                isActive: data?.isActive,
            }
        })
    }

    public async findOne(data: DeepPartial<Category>): Promise<Category | null> {
        return this.categoryRepository.findOne({
            where: {
                _id: data?._id,
                shop: {
                    _id: data?.shop?._id
                },
                name: data?.name,
                isActive: data?.isActive,
            }
        })
    }

    public async save(data: DeepPartial<Category>): Promise<Category> {
        return this.categoryRepository.save(data);
    }

    public async update(criteria: CriteriaDto, data: DeepPartial<Category>) {
        return this.categoryRepository.update({
            _id: criteria._id,
            shop: {
                _id: criteria.shopId
            }
        }, data);
    }
    
    public async hardDelete(criteria: CriteriaDto){
        return this.categoryRepository.delete({
            _id: criteria._id,
            shop: {
                _id: criteria.shopId
            }
        })
    }

    public unsafe_repository(): Repository<Category> {
        return this.categoryRepository;
    }
}