import {
    Body,
    Controller,
    Get,
    InternalServerErrorException,
    NotFoundException,
    PreconditionFailedException,
    Put,
    UnauthorizedException,
    UseInterceptors
} from "@nestjs/common";

import { Cookies } from "src/decorators";
import { ResponseInterceptor } from "src/interceptors";
import { ShopService } from "src/modules/shops/services/shop.service";
import { AuthService } from "src/services/auth.service";
import { VirtualShowroomConfig } from "../models/virtual-showroom-config.model";
import { VirtualShowroomConfigService } from "../services/virtual-showroom-config.service";
import { VirtualShowroomService } from "../services/virtual-showroom.service";

@UseInterceptors(ResponseInterceptor)
@Controller("virtual-showroom/config")
export class VirtualShowroomConfigController {

    constructor(
        private readonly virtualShowroomConfigService: VirtualShowroomConfigService,
        private readonly virtualShowroomService: VirtualShowroomService,
        private readonly shopService: ShopService,
        private readonly authService: AuthService
    ) { }

    @Get()
    async getConfig(@Cookies('session') session: string){
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const shop = await this.shopService.getShopByUserId(user._id)

        if (!shop) {
            throw new NotFoundException()
        }

        const virtualShowroomConfig = await this.virtualShowroomConfigService.getConfigByVS(
            shop.virtualShowroom?._id
        )

        if (!virtualShowroomConfig) {
            throw new NotFoundException()
        }

        return virtualShowroomConfig
    }

    @Put()
    async updateConfig(@Cookies('session') session: string, @Body() body: Partial<VirtualShowroomConfig>){
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const hasVirtualShowroom = await this.virtualShowroomService.hasVirtualShowroom(shop._id)

        if (!hasVirtualShowroom) {
            throw new PreconditionFailedException()
        }

        const updatedConfig = await this.virtualShowroomConfigService.updateConfig(
            hasVirtualShowroom, 
            {...body}
        )

        if (!updatedConfig) {
            throw new InternalServerErrorException()
        }

        return updatedConfig
    }

}