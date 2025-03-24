import { Shop } from '@/server/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DnsService } from 'src/modules/cloudflare/services/dns.service';
import { ReportsService } from 'src/modules/reports/services/reports.service';
import { Repository } from 'typeorm';
import { CreateVirtualShowroomServerDto } from '../dtos';
import { VirtualShowroomRepository } from '../repositories/virtual-showroom.repository';

@Injectable()
export class VirtualShowroomService {

    constructor(
        @InjectRepository(Shop)
        private readonly shopRepository: Repository<Shop>,
        private readonly virtualShowroomRepository: VirtualShowroomRepository,
        private readonly dnsService: DnsService,
        private readonly reportsService: ReportsService
    ) { }

    async get(shopId: string) {
        return this.shopRepository.findOne({
            where: {
                _id: shopId
            },
            relations: {
                virtualShowroom: true
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
        const virtualShowroom = await this.shopRepository.findOne({
            where: {
                _id: shopId
            },
            relations: {
                virtualShowroom: true
            }
        })

        return virtualShowroom?.virtualShowroom?._id
    }

    async createAndSave(data: CreateVirtualShowroomServerDto) {
        const virtualShowroom = await this.virtualShowroomRepository.create(data)
        return this.virtualShowroomRepository.save(virtualShowroom)
    }

    async createUrl(shopName: string) {

        let url: string | undefined = undefined

        try {
            const parsedName = shopName.trim().toLowerCase()?.replace(' ', '-');
            const dns = await this.dnsService.create(parsedName)
            url = `https://${dns.name}`
        }
        catch (e){
            await this.reportsService.logError(e, 'MEDIUM', {
                operation: 'assignCNAME'
            })
        }
        return url;
    }

    async toggle(isPublic: boolean, _id: string) {
        const virtualShowroom = await this.virtualShowroomRepository.findOneById(_id)

        if (!virtualShowroom) {
            return null
        }

        virtualShowroom.isPublic = isPublic

        return this.virtualShowroomRepository.save(virtualShowroom)
    }

}
