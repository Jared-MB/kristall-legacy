import { Injectable } from "@nestjs/common";
import { VirtualShowroomRepository } from "../repositories/virtual-showroom.repository";

@Injectable()
export class VirtualShowroomPublicService {

    constructor(
        private readonly virtualShowroomRepository: VirtualShowroomRepository,
    ) { }

    async get(subdomain: string) {
        const url = `https://${subdomain}.kristall.app`

        const virtualShowroom = await this.virtualShowroomRepository.findBy({
            url
        }, {withConfig: true})

        return virtualShowroom
    }
}