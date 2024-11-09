import { Controller, Get, NotFoundException, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { Cookies } from '@kristall/server/src/decorators';
import { ResponseInterceptor } from '@kristall/server/src/interceptors';
import { AuthService } from '@kristall/server/src/services';
import { ReportsService } from '../services/reports.service';

@Controller('reports')
export class ReportsController {
  constructor(
    private reportsService: ReportsService,
    private authService: AuthService,
  ) { }

  @UseInterceptors(ResponseInterceptor)
  @Get()
  async getLatestReports(@Cookies('session') session: string) {

    const user = this.authService.decodeCookie(session);
    if (!user) throw new UnauthorizedException()

    const ADMINS_USERNAMES = process.env.ADMINS_USERNAMES?.split(',').map(username => username.trim());
    const ADMINS_SHOPS_IDS = process.env.ADMINS_SHOP_IDS?.split(',').map(shopId => shopId.trim());

    if (!ADMINS_USERNAMES || !ADMINS_SHOPS_IDS) throw new UnauthorizedException()

    if (ADMINS_USERNAMES.includes(user.username) && ADMINS_SHOPS_IDS.includes(user.shop._id)) {
      return this.reportsService.getRecentErrors();
    }

    throw new NotFoundException()
  }
}
