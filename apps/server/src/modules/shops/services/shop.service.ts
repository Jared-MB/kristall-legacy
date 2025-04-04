import { Image, PublicPage, Shop } from '@/server/entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

import { LocationsService } from '@/server/locations/locations.service';
import { SettingsService } from '@/server/modules/settings/services';
import { randomUUID } from 'node:crypto';

@Injectable()
export class ShopService {
    constructor(
        @InjectRepository(Shop) private shopRepository: Repository<Shop>,
        @InjectRepository(Image) private imageRepository: Repository<Image>,
        @InjectRepository(PublicPage) private publicPageRepository: Repository<PublicPage>,
        private readonly locationsService: LocationsService,
        private readonly settingsService: SettingsService
    ) { }

    async getShopName(userId: string) {
        const shop = await this.shopRepository.findOne({
            where: {
                users: {
                    _id: userId,
                },
            },
        });
        return shop ? shop.name : null;
    }

    async getShopByUserId(userId: string) {
        return await this.shopRepository.findOne({
            where: {
                users: {
                    _id: userId,
                }
            },
            relations: {
                virtualShowroom: true
            }
        })
    }

    async getShopById(id: string) {
        return await this.shopRepository.findOne({
            where: {
                _id: id,
            },
            relations: {
                image: true,
                users: true,
                virtualShowroom: true,
            },
        });
    }

    /**
    * @deprecated
    */
    async getShopByName(name: string) {
        const shops = await this.shopRepository.find({
            relations: {
                publicPage: true
            }
        });
        const shop = shops.find((shop) => shop.name.toLowerCase() === name);
        if (!shop || !shop.publicPage || !shop.publicPage.isPublic) {
            return null;
        }
        return shop

    }

    /**
    * @deprecated
    */
    async createShop(shop: Omit<Shop, '_id' | 'image' | 'publicPage' | 'settings' | 'virtualShowroom'>): Promise<Shop> {
        const _id = randomUUID();

        const generatedSetting = this.settingsService.create({
            shop: { _id }
        })
        const generatedShop = this.shopRepository.create({
            ...shop,
            _id,
            settings: generatedSetting
        });
        const shopSaved = await this.shopRepository.save(generatedShop);

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
        await this.shopRepository.update(
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
        const shop = await this.shopRepository.findOne({
            where: {
                _id: shopId,
            },
            relations: {
                publicPage: true,
            },
        })
        if (!shop) {
            throw new Error('Shop not found');
        }

        if (!shop.publicPage) {
            const newPublicPage = this.publicPageRepository.create(publicPage);
            await this.publicPageRepository.save(newPublicPage);
            shop.publicPage = newPublicPage;
            await this.shopRepository.save(shop);
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
        const shop = await this.shopRepository.findOne({
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
        return shop.publicPage
    }

    async getShopImage(shopId: string) {
        const shop = await this.shopRepository.findOne({
            where: {
                _id: shopId,
            },
            relations: {
                image: true,
            },
        });
        if (!shop) {
            throw new NotFoundException()
        }
        return shop?.image?.url || null;
    }

    async connectVirtualShowroom(shopId: string, virtualShowroomId: string) {
        await this.shopRepository.update({
            _id: shopId
        }, {
            virtualShowroom: {
                _id: virtualShowroomId
            }
        })
    }

    async getByVirtualShowroomName(virtualShowroomName: string) {
        return await this.shopRepository.findOne({
            where: {
                name: ILike(`%${virtualShowroomName}%`)
            },
            relations: {
                virtualShowroom: true
            }
        })
    }
}
