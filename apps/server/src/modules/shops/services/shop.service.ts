import { Image, PublicPage, Shop } from '@/server/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { SettingsService } from '@/server/modules/settings/services';
import { randomUUID } from 'node:crypto';
import { LocationsService } from 'src/modules/locations/services/locations.service';
import { ShopRepository } from '../repositories/shop.repository';

@Injectable()
export class ShopService {
  constructor(
    /**
     * @deprecated
     */
    @InjectRepository(Shop) private deprecatedShopRepository: Repository<Shop>,
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    @InjectRepository(PublicPage)
    private publicPageRepository: Repository<PublicPage>,
    private readonly locationsService: LocationsService,
    private readonly settingsService: SettingsService,
    private readonly shopRepository: ShopRepository,
  ) {}

  async getShopName(userId: string) {
    const shop = await this.deprecatedShopRepository.findOne({
      where: {
        users: {
          _id: userId,
        },
      },
    });
    return shop ? shop.name : null;
  }

  async getShopByUserId(userId: string) {
    return await this.deprecatedShopRepository.findOne({
      where: {
        users: {
          _id: userId,
        },
      },
      relations: {
        virtualShowroom: true,
      },
    });
  }

  /**
   * @cached
   */
  async getShopById(id: string) {
    return await this.shopRepository.findOne(id);
  }

  /**
   * @deprecated
   */
  async getShopByName(name: string) {
    const shops = await this.deprecatedShopRepository.find({
      relations: {
        publicPage: true,
      },
    });
    const shop = shops.find((shop) => shop.name.toLowerCase() === name);
    if (!shop || !shop.publicPage || !shop.publicPage.isPublic) {
      return null;
    }
    return shop;
  }

  /**
   * @deprecated
   */
  async createShop(
    shop: Omit<
      Shop,
      '_id' | 'image' | 'publicPage' | 'settings' | 'virtualShowroom'
    >,
  ): Promise<Shop> {
    const _id = randomUUID();

    const generatedSetting = this.settingsService.create({
      shop: { _id },
    });
    const generatedShop = this.deprecatedShopRepository.create({
      ...shop,
      _id,
      settings: generatedSetting,
    });
    const shopSaved = await this.deprecatedShopRepository.save(generatedShop);

    await this.locationsService.createLocation({
      shop: generatedShop,
      name: 'Almacén',
    });
    return shopSaved;
  }

  /**
   * @deprecated
   */
  async addLogoToShop(image: Image, shop: Shop) {
    const newImage = this.imageRepository.create(image);
    await this.imageRepository.save(newImage);
    await this.deprecatedShopRepository.update(
      {
        _id: shop._id,
      },
      { image: newImage },
    );
    return {
      _id: shop._id,
      name: shop.name,
      image: newImage,
    };
  }

  /**
   * @deprecated
   */
  async updatePublicPage(publicPage: PublicPage, shopId: string) {
    const shop = await this.deprecatedShopRepository.findOne({
      where: {
        _id: shopId,
      },
      relations: {
        publicPage: true,
      },
    });
    if (!shop) {
      throw new Error('Shop not found');
    }

    if (!shop.publicPage) {
      const newPublicPage = this.publicPageRepository.create(publicPage);
      await this.publicPageRepository.save(newPublicPage);
      shop.publicPage = newPublicPage;
      await this.deprecatedShopRepository.save(shop);
    } else {
      shop.publicPage = { ...shop.publicPage, ...publicPage };
      await this.publicPageRepository.save(shop.publicPage);
    }
    return shop.publicPage;
  }

  /**
   * @deprecated
   */
  async getPublicPageConfig(shopId: string) {
    const shop = await this.deprecatedShopRepository.findOne({
      where: {
        _id: shopId,
      },
      relations: {
        publicPage: true,
        image: true,
      },
    });
    if (!shop || !shop.publicPage || !shop.publicPage.isPublic) {
      throw new Error('Shop not found');
    }
    return shop.publicPage;
  }

  async getShopImage(shopId: string) {
    const shop = await this.deprecatedShopRepository.findOne({
      where: {
        _id: shopId,
      },
      relations: {
        image: true,
      },
    });
    if (!shop) {
      throw new NotFoundException();
    }
    return shop?.image?.url || null;
  }

  async connectVirtualShowroom(shopId: string, virtualShowroomId: string) {
    await this.deprecatedShopRepository.update(
      {
        _id: shopId,
      },
      {
        virtualShowroom: {
          _id: virtualShowroomId,
        },
      },
    );
  }

  async getByVirtualShowroomName(virtualShowroomName: string) {
    return await this.deprecatedShopRepository.findOne({
      where: {
        name: ILike(`%${virtualShowroomName.replaceAll('-', ' ')}%`),
      },
      relations: {
        virtualShowroom: true,
        image: true,
      },
    });
  }
}
