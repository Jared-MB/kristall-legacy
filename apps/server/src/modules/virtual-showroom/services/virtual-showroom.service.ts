import { RANDOM_WORDS } from '@/server/constants';
import { PublicPage, Shop } from '@/server/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateVirtualShowroomServerDto } from '../dtos';

@Injectable()
export class VirtualShowroomService {

    constructor(
        @InjectRepository(PublicPage)
        private readonly publicPageRepository: Repository<PublicPage>,
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
    ) { }

    async get(shopId: string) {
        return this.shopRepository.findOne({
            where: {
                _id: shopId
            },
            relations: {
                publicPage: true
            }
        })
    }

    /**
     * Checks if a Virtual Showroom exists for a shop
     * 
     * @param shopId 
     * @returns The Virtual Showroom ID if it exists, otherwise undefined
     */
    async hasVirtualShowroom(shopId: string): Promise<string | undefined> {
        const publicPage = await this.shopRepository.findOne({
            where: {
                _id: shopId
            },
            relations: {
                publicPage: true
            }
        })

        return publicPage?.publicPage?._id
    }

    private create(data: CreateVirtualShowroomServerDto) {
        return this.publicPageRepository.create(data)
    }

    private async save(publicPage: PublicPage) {
        return this.publicPageRepository.save(publicPage)
    }

    async createAndSave(data: CreateVirtualShowroomServerDto) {
        const publicPage = this.create(data)
        return this.save(publicPage)

    }

    async createUrl(shopName: string) {
        const clientUrl = process.env.CLIENT_URL;
        const baseUrl = `${clientUrl}/shops/${shopName.toLowerCase()}`;
        let url = baseUrl;
        let isUrlAvailable = await this.isUrlAvailable(url);

        while (!isUrlAvailable) {
            const randomIndex = Math.floor(Math.random() * RANDOM_WORDS.length);
            url = `${baseUrl}-${RANDOM_WORDS[randomIndex]}`;
            isUrlAvailable = await this.isUrlAvailable(url);
        }

        return url;
    }

    private async isUrlAvailable(url: string) {
        const publicPage = await this.publicPageRepository.findOne({
            where: { url }
        });

        return !publicPage;
    }

    async toggle(isPublic: boolean, _id: string) {
        const publicPage = await this.publicPageRepository.findOne({
            where: {
                _id
            }
        })

        if (!publicPage) {
            return null
        }

        publicPage.isPublic = isPublic

        return this.publicPageRepository.save(publicPage)
    }

}
