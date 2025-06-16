import { Injectable } from "@nestjs/common";
import { VirtualShowroomRepository } from "../repositories/virtual-showroom.repository";

@Injectable()
export class VirtualShowroomPublicService {

    constructor(
        private readonly virtualShowroomRepository: VirtualShowroomRepository,
    ) { }

    private getVirtualShowroomUrl = (subdomain: string) => `https://${subdomain}.kristall.app`

    async get(subdomain: string) {
        const url = this.getVirtualShowroomUrl(subdomain)

        const virtualShowroom = await this.virtualShowroomRepository.findBy({
            url
        }, {withConfig: true})

        return virtualShowroom
    }
}