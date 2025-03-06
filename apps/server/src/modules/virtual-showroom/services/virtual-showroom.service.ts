import { PublicPage, Shop } from '@/server/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DnsService } from 'src/modules/cloudflare/services/dns.service';
import { ReportsService } from 'src/modules/reports/services/reports.service';
import { Repository } from 'typeorm';
import { CreateVirtualShowroomServerDto } from '../dtos';

@Injectable()
export class VirtualShowroomService {

    constructor(
        @InjectRepository(PublicPage)
        private readonly publicPageRepository: Repository<PublicPage>,
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        private readonly dnsService: DnsService,
        private readonly reportsService: ReportsService
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

        let url: string | undefined = undefined

        try {
            const parsedName = shopName.trim().toLowerCase().replaceAll(' ', '-');
            const dns = await this.dnsService.create(parsedName)
            url = `https://${dns.name}`
        }
        catch (e){
            await this.reportsService.logError(e)
        }
        return url;
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
