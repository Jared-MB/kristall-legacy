import { Body, Controller, Get, Put, UnauthorizedException } from '@nestjs/common';
import { Cookies } from '@kristall/server/src/decorators/cookie.decorator';
import { AuthService } from '@kristall/server/src/services';
import { CreateVirtualShowroomClientDto } from '../dtos';
import { VirtualShowroomService } from '../services/virtual-showroom.service';

import { ShopService } from '@kristall/server/src/modules/shops/services';

@Controller('virtual-showroom')
export class VirtualShowroomController {

    constructor(
        private readonly authService: AuthService,
        private readonly virtualShowroomService: VirtualShowroomService,
        private readonly shopService: ShopService
    ) { }

    @Get()
    async getVirtualShowroom(
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session);
        if (!user) {
            throw new UnauthorizedException();
        }

        return await this.virtualShowroomService.get(user.shop._id)
    }

    @Put('toggle')
    async enableVirtualShowroom(
        @Cookies('session') session: string,
        @Body() body: CreateVirtualShowroomClientDto
    ) {
        const user = this.authService.decodeCookie(session);
        if (!user) {
            throw new UnauthorizedException();
        }

        const hasVirtualShowroom = await this.virtualShowroomService.hasVirtualShowroom(user.shop._id)
        if (!hasVirtualShowroom) {
            const url = await this.virtualShowroomService.createUrl(user.shop.name)
            const virtualShowroom = await this.virtualShowroomService.createAndSave({
                isPublic: true,
                shopId: user.shop._id,
                url
            })
            return await this.shopService.connectVirtualShowroom(user.shop._id, virtualShowroom._id)
        }

        await this.virtualShowroomService.toggle(body.isPublic, hasVirtualShowroom)
    }

}
