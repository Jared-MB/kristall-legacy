import { ResponseInterceptor } from '@/server/interceptors';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AuthRequest } from 'src/interfaces/requests';


import { CreateClientDto } from '../dtos/create-client.dto';
import { ParamDto, QueryClientDto } from '../dtos/param.dto';
import { UpdateClientDto } from '../dtos/update-client.dto';
import { ClientsService } from '../services/clients.service';

@UseInterceptors(ResponseInterceptor)
@UsePipes(ValidationPipe)
@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
  ) { }

  @HttpCode(200)
  @Get()
  async getClients(@Req() req: AuthRequest, @Query() query: QueryClientDto) {
    const { shop } = req.user
    return await this.clientsService.findByShopId(shop._id, {
      status: query.status,
    });
  }

  @HttpCode(201)
  @Post()
  async addClient(
    @Body() body: CreateClientDto,
    @Req() req: AuthRequest,
  ) {
    const { shop } = req.user
    return await this.clientsService.save({
      name: body.name,
      shopId: shop._id
    });
  }

  @HttpCode(200)
  @Patch(':id')
  async updateClient(
    @Body() body: UpdateClientDto,
    @Param() param: ParamDto,
    @Req() req: AuthRequest,
  ) {
    const { shop } = req.user

    if (body._id !== param.id) {
      throw new BadRequestException('Invalid request');
    }

    return await this.clientsService.update({
      _id: param.id,
      shopId: shop._id,
    }, {
      name: body.name,
    });
  }

  @HttpCode(200)
  @Delete(':id')
  async deleteClient(
    @Param() param: ParamDto,
    @Req() req: AuthRequest,
  ) {
    const { shop } = req.user

    return await this.clientsService.softDelete({
      _id: param.id,
      shopId: shop._id,
    });
  }
}
