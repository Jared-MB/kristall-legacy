import { Product } from '@/server/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Not, Repository } from 'typeorm';

type SortByProduct = 'price-higher' | 'price-lower' | 'newest' | 'best-sellers';
export type QueryProduct = {
  take: number;
  skip: number;
  'sort-by'?: SortByProduct;
  name?: string;
  category?: string;
};

@Injectable()
export class PublicProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  private getOrderBy(sortBy?: SortByProduct): {[key: string]: string} {
    switch (sortBy) {
      case 'price-higher':
        return { price: 'DESC' };
      case 'price-lower':
        return { price: 'ASC' };
      case 'newest':
        return { createdAt: 'DESC' };
      case 'best-sellers':
        return { totalSales: 'DESC' };
      default:
        return { createdAt: 'DESC' };
    }
  }

  async getProductById(shopId: string, productId: string) {
    const product = await this.productRepository.findOne({
      where: {
        _id: productId,
        shop: { _id: shopId },
      },
      relations: {
        image: true,
        category: true,
        locations: true,
      },
      select: [
        '_id',
        'name',
        'image',
        'price',
        'category',
        'createdAt',
        'totalSales',
        'stock'
      ],
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      isAvailable: product.stock > 0
    }
  }

  async getRelatedProducts(shopId: string, productId: string, query: { take: number }) {
    const product = await this.getProductById(shopId, productId)

    if (!product) {
      return null
    }

    const products = await this.productRepository.find({
      where: {
        shop: { _id: shopId },
        category: {
          _id: product.category._id,
        },
        _id: Not(product._id)
      },
      relations: ['image', 'category'],
      select: [
        '_id',
        'name',
        'image',
        'price',
        'category',
        'createdAt',
        'totalSales',
        'stock'
      ],
      take: query.take,
    })

    if (!products) {
      return null
    }

    return products.map(product => {
      const { stock,...rest } = product

      return {
       ...rest,
        isAvailable: stock > 0
      }
    })
  }

  async getProducts(shopId: string, query: QueryProduct) {

    const { skip: sk, take: tk } = query

    const skip = Number.isNaN(Number(sk)) ? 0 : Number(sk)
    const take = Number.isNaN(Number(tk)) ? 7 : Number(tk)

    const productsPromise = this.productRepository.find({
      where: {
        shop: { _id: shopId },
        name: query.name ? ILike(`%${query.name}%`) : undefined,
        category: {
          name: query.category ? ILike(`%${query.category}%`) : undefined
        }
      },
      relations: ['image', 'category'],
      select: [
        '_id',
        'name',
        'image',
        'price',
        'category',
        'createdAt',
        'totalSales',
        'stock'
      ],
      order: {
        ...this.getOrderBy(query['sort-by']),
      },
      take,
      skip
    });

    const ONE_HOUR = 60 * 60 * 1000;

    const countPromise = this.productRepository.count({
      where: {
        shop: { _id: shopId },
        name: query.name ? ILike(`%${query.name}%`) : undefined,
        category: {
          name: query.category ? ILike(`%${query.category}%`) : undefined
        }
      },
      select: ['_id'],
      cache: ONE_HOUR / 2
    });

    const [products, count] = await Promise.all([productsPromise, countPromise])

    const mappedProduct = products.map(product => {
      const { stock, ...rest } = product

      return {
        ...rest,
        isAvailable: stock > 0
      }
    })

    return {
			entities: mappedProduct,
			next: products.length === take ? skip + take : null,
      previous: skip - take >= 0 ? (skip - take) + 1 : null,
			page: Math.ceil(skip / take) + 1, 
			hasMore: count > skip + take,
			totalPages: Math.ceil(count / take),
		};
  }

  async getBestSellers(shopId: string) {
    return await this.productRepository.find({
      where: {
        shop: { _id: shopId },
      },
      relations: ['image', 'category'],
      select: [
        '_id',
        'name',
        'image',
        'price',
        'category',
        'totalSales',
        'createdAt',
      ],
      order: {
        totalSales: 'DESC',
      },
      take: 10,
      skip: 0,
    });
  }

  async getNewProducts(shopId: string) {
    return await this.productRepository.find({
      where: {
        shop: { _id: shopId },
      },
      relations: ['image', 'category'],
      select: [
        '_id',
        'name',
        'image',
        'price',
        'category',
        'createdAt',
        'totalSales',
      ],
      order: {
        createdAt: 'DESC',
      },
      take: 10,
      skip: 0,
    });
  }
}
