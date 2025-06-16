import { Controller, Get, NotFoundException, Param, UseInterceptors } from "@nestjs/common";
import { Public } from "src/decorators";
import { ResponseInterceptor } from "src/interceptors";
import { ShopService } from "src/modules/shops/services";
import { LocationsService } from "../services/locations.service";

/**
 * Public locations controller
 * 
 * Its located on the locations folder modules because its related to it, but
 * as we need the shop service to get the shop name, we need to inject it
 * on the shops module to avoid trouble with nestjs circular dependencies
 */
@UseInterceptors(ResponseInterceptor)
@Public()
@Controller('public/locations')
export class PublicLocationsController {

    constructor(
        private readonly locationsService: LocationsService,
        private readonly shopService: ShopService,
    ){  }


    @Get(':shopName')
    async getPublicLocations(@Param('shopName') shopName: string){
        const shop = await this.shopService.getByVirtualShowroomName(shopName)
        if (!shop){
            throw new NotFoundException('Shop not found')
        }

        return await this.locationsService.getLocations(shop._id)
    }

}