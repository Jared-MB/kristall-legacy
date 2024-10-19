import { Controller, Get, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
  ) {}

  @Get('systemClients')
  async getSystemClients(@Headers() headers: { authorization: string }) {
    try {
      const token = headers.authorization.split(' ')[1];
      const clients = await this.adminService.searchSystemClients(token);
      return {
        message: 'Clients found',
        status: 200,
        data: clients, 
      };
    } catch (err) {
      return {
        message: 'No routes found',
        status: 404,
      };
    }
  }
}
