import { Controller, Get, NotFoundException, Param, UseInterceptors } from "@nestjs/common";
import { Public } from "src/decorators";
import { ResponseInterceptor } from "src/interceptors";
import { VirtualShowroomPublicService } from "../services/virtual-showroom.public.service";

@Public()
@UseInterceptors(ResponseInterceptor)
@Controller("virtual-showroom/public")
export class VirtualShowroomPublicController {

    constructor(
        private readonly virtualShowroomPublicService: VirtualShowroomPublicService
    ){}

    @Get(':subdomain')
    async get(@Param('subdomain') subdomain: string){
        const virtualShowroom = await this.virtualShowroomPublicService.get(subdomain)
        if (!virtualShowroom || !virtualShowroom?.isPublic){
            throw new NotFoundException()
        }

        return virtualShowroom
    }

}