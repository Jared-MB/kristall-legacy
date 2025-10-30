import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities';
import { Repository } from 'src/interfaces/repository';
import { CacheService } from 'src/services/cache.service';
import { Repository as TypeOrmRepository } from 'typeorm';

@Injectable()
export class ShopRepository implements Repository<Shop> {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: TypeOrmRepository<Shop>,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * @cached
   */
  public async findOne(id: string): Promise<Shop | null> {
    const cachedShop = await this.cacheService.get<Shop>(id, 'shop');
    if (cachedShop) {
      return cachedShop;
    }

    const shop = await this.shopRepository.findOne({
      where: {
        _id: id,
      },
      relations: {
        image: true,
        users: true,
        virtualShowroom: true,
      },
    });

    if (!shop) {
      await this.cacheService.set(id, null, 'shop');
      return null;
    }

    await this.cacheService.set(id, shop, 'shop');
    return shop;
  }

  public async findAll(): Promise<Shop[]> {
    throw new Error('Method not implemented.');
  }

  public async findBy(data: Partial<Shop>): Promise<Shop | null> {
    throw new Error('Method not implemented.');
  }

  public async create(data: Shop): Promise<Shop> {
    return this.shopRepository.create(data);
  }

  public async save(data: Shop): Promise<Shop> {
    return this.shopRepository.save(data);
  }

  public async delete(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
