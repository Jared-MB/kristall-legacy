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
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cookies } from '@kristall/server/src/decorators';
import { Client } from '@kristall/server/src/entities';
import { ResponseInterceptor } from '@kristall/server/src/interceptors';
import { AuthService } from '@kristall/server/src/services';
import { TokenService, Utils } from '@kristall/server/src/utilities';
import { ClientsService } from './clients.service';

@Controller('clients')
export class ClientsController {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly authService: AuthService,
    private readonly utils: Utils,
    private readonly tokenService: TokenService,
  ) { }

  @UseInterceptors(new ResponseInterceptor())
  @Get()
  async getClientsByShopID(
    @Cookies('session') session: string,
    @Query() query: {
      take: number,
      skip: number,
      client?: string
    } = { take: 7, skip: 0 }
  ) {
    const user = this.authService.decodeCookie(session);
    if (!user) {
      throw new UnauthorizedException()
    }
    return await this.clientsService.getByShop(user.shop._id, query);
  }

  @Post()
  async addClient(
    @Body() body: Client,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const session = req.cookies['session'];
    const payload = this.tokenService.decodeCookie(session);
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const request = this.clientsService.addClientToDB(
      body,
      payload.shop
    );
    return this.utils.adaptResponse(request, res, {
      message: 'Client added successfully',
      status: 201,
    });
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
