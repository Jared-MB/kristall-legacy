import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Product } from '../models/product.model';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async incrementStock(productId: string, increment: number) {
    return await this.productRepository.increment(
      {
        _id: productId,
      },
      'stock',
      increment,
    );
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
