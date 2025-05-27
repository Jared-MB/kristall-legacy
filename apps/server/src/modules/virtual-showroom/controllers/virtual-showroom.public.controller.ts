import { Controller, Get, NotFoundException, Param, UseInterceptors } from "@nestjs/common";
import { Public } from "src/decorators";
import { ResponseInterceptor } from "src/interceptors";
import { ShopService } from "src/modules/shops/services/shop.service";
import { VirtualShowroomPublicService } from "../services/virtual-showroom.public.service";

@Public()
@UseInterceptors(ResponseInterceptor)
@Controller("virtual-showroom/public")
export class VirtualShowroomPublicController {

    constructor(
        private readonly virtualShowroomPublicService: VirtualShowroomPublicService,
        private readonly shopService: ShopService
    ){}

    @Get(':subdomain')
    async get(@Param('subdomain') subdomain: string){
        const virtualShowroom = await this.virtualShowroomPublicService.get(subdomain)
        if (!virtualShowroom || !virtualShowroom?.isPublic){
            throw new NotFoundException()
        }

        const shop = await this.shopService.getByVirtualShowroomName(subdomain)
        if (!shop){
            throw new NotFoundException()
        }

        return {
            ...virtualShowroom,
            image: shop?.image?.url
        }
    }

}