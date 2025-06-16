import { Client } from '@/server/entities';
import { ResponseInterceptor } from '@/server/interceptors';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthRequest } from 'src/interfaces/requests';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly authService: AuthService,
    private readonly utils: Utils,
    private readonly tokenService: TokenService,
  ) { }

  @UseInterceptors(ResponseInterceptor)
  @Get()
  async getClientsByShopID(
    @Req() req: AuthRequest,
    @Query() query: {
      take: number,
      skip: number,
      client?: string
    } = { take: 7, skip: 0 }
  ) {
    const { shop } = req.user
    return await this.clientsService.getByShop(shop._id, query);
  }

  @UseInterceptors(ResponseInterceptor)
  @Post()
  async addClient(
    @Body() body: Client,
    @Req() req: AuthRequest,
  ) {
    const { shop } = req.user
    return await this.clientsService.addClientToDB(
      body,
      shop
    );
  }

  @Put(':id')
  async updateClient(
    @Body() body: Client,
    @Res() res: Response,
    @Req() req: Request,
    @Param() param: { id: string },
  ) {
    const session = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(session);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (body._id !== param.id) {
      return res.status(400).json({ message: 'Invalid request' });
    }

    const request = this.clientsService.updateClient(
      body
    );
    return this.utils.adaptResponse(request, res, {
      message: 'Client updated successfully',
      status: 200,
    });
  }

  @Delete(':id')
  async deleteClient(
    @Param() param: { id: string },
    @Headers() headers: any,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const session = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(session);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const request = this.clientsService.deleteClient(
      param.id,
      payload.shop._id
    );
    return this.utils.adaptResponse(request, res, {
      message: 'Client deleted successfully',
      status: 200,
    });
  }
}
