import { DeliveryLocation } from '@/server/entities';
import { TokenService, Utils } from '@/server/utilities';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { Response } from 'express';
import { ResponseInterceptor } from 'src/interceptors';
import { AuthRequest } from 'src/interfaces/requests';
import { CreateLocationDto } from '../dtos/create-location.dto';
import { UpdateLocationDto } from '../dtos/update-location.dto';
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

  @UseInterceptors(ResponseInterceptor)
  @Get('can-create')
  async canCreateLocation(@Req() req: AuthRequest){
    const { shop, permissions, plan } = req.user

    const canCreate = await this.locationsService.canCreateLocation({
      shopId: shop._id,
      permissions,
      plan,
    });

    return canCreate
  }

  @UseInterceptors(ResponseInterceptor)
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  @Post()
  async createLocation(@Body() location: CreateLocationDto, @Req() req: AuthRequest) {
    const { shop, permissions, plan } = req.user

    return await this.locationsService.save(location, {
      shopId: shop._id,
      permissions,
      plan,
    });
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

  @UseInterceptors(ResponseInterceptor)
  @Patch('/:id')
  async updateLocation(
    @Param('id') id: string,
    @Body() location: UpdateLocationDto,
    @Req() req: AuthRequest,
  ) {
    if (!id || !location._id || id !== location._id) {
      throw new BadRequestException('Invalid id');
    }

    const { shop } = req.user
    return await this.locationsService.updateLocation(
      {
        _id: id,
        shopId: shop._id,
      },
      location,
    );
  }
}
