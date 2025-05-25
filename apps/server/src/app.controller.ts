import { Controller, Get, Post, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';

import { Cookies, Public } from './decorators';
import { ResponseInterceptor } from './interceptors';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { AuthService } from './modules/auth/services/auth.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
  ) { }

  @Public()
  @UseInterceptors(ResponseInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Public()
  @Get('health-check')
  healthCheck(@Res() res: Response) {
    return res.status(200).json({ status: 'ok' });
  }

  @UseInterceptors(ResponseInterceptor)
  @Get('auth/verify-token')
  async validate(@Cookies('session') session: string) {
    return await this.authService.validateToken(session);
  }
}
