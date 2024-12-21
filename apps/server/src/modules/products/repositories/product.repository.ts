import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ILike, Repository } from 'typeorm';

import { GetProductQueryDto } from '../dto/get-product-query.dto';
import { Product } from '../models/product.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async count({shopId, name, category, location}: {
    shopId: string,
    name?: string,
    category?: string,
    location?: string
  }){
    return this.productRepository.count({
      where: {
        shop: {
          _id: shopId
        },
        name: name ? ILike(`%${name}%`) : undefined,
        category: category ? { _id: category } : undefined,
        locations: location ? { locationId: location } : undefined
      }
    })
  }

  async incrementStock(productId: string, increment: number) {
    return await this.productRepository.increment(
      {
        _id: productId,
      },
      'stock',
      increment,
    );
  }

  async getPaginated(shopId: string, query: GetProductQueryDto){
    const { take = 7, skip = 0, name, category, orderBy = 'DESC', location, sortBy = 'createdAt' } = query;

    const count = await this.count({shopId, ...query})

    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
        category: category ? { _id: category } : undefined,
        name: name ? ILike(`%${name}%`) : undefined,
        locations:location ? { locationId: location } : undefined
      },
      relations: ['image', 'locations', 'category'],
      order: {
        [sortBy]: orderBy,
      },
      take,
      skip,
    });

    return {
      entities: products,
      next: products.length === take ? skip + take : null,
      previous: skip - take >= 0 ? skip - take : null,
      page: Math.ceil(skip / take) + 1,
      hasMore: count > skip + take,
      totalPages: Math.ceil(count / take)
    };
  }

  async findById(_id: string) {
    return await this.productRepository.findOne({
      where: {
        _id,
      },
      relations: {
        locations: {
          product: true
        },
      },
    });
  }
}
