import { DeliveryLocation, Location } from '@/server/entities';
import { TokenService, Utils } from '@/server/utilities';
import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseInterceptor } from 'src/interceptors';
import { AuthRequest } from 'src/interfaces/requests';
import { LocationsService } from '../services/locations.service';

@Controller('locations')
export class LocationsController {
  constructor(
    private readonly locationsService: LocationsService,
    private readonly tokenService: TokenService,
    private readonly utils: Utils,
  ) { }

  @UseInterceptors(ResponseInterceptor)
  @Get()
  async getLocations(@Req() req: AuthRequest) {
    const { shop } = req.user
    return await this.locationsService.getLocations(shop._id);
  }

  @Post()
  async createLocation(@Body() location: Location, @Res() res: Response, @Req() req: Request) {
    const session = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(session);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const response = this.locationsService.createLocation({
      ...location,
      shop: payload.shop,
    });
    return this.utils.adaptResponse(response, res);
  }

  @Get('delivery')
  async getAllDeliveryLocations(
    @Res() res: Response,
    @Headers('authorization') auth: string,
  ) {
    const shop = this.tokenService.getShop(auth);
    if (!shop) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const response = this.locationsService.getAllDeliveryLocations(shop._id);
    return this.utils.adaptResponse(response, res);
  }

  @Post('delivery')
  async createDeliveryLocation(
    @Body() deliveryLocation: Omit<DeliveryLocation, '_id'>,
    @Res() res: Response,
    @Headers('authorization') auth: string,
  ) {
    const shop = this.tokenService.getShop(auth);
    if (!shop) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const response = this.locationsService.createDeliveryLocation(deliveryLocation);
    return this.utils.adaptResponse(response, res);
  }

  @Put('/:id')
  async updateLocation(
    @Param('id') id: string,
    @Body() location: Partial<Location>,
    @Headers('authorization') auth: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const session = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(session);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const response = this.locationsService.updateLocation(
      id,
      location,
      payload.shop._id,
    );
    return this.utils.adaptResponse(response, res);
  }
}
