import { Controller, Get, Post, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { ResponseInterceptor } from './interceptors';
import { Utils } from './utilities';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private readonly utils: Utils,
  ) { }

  @Public()
  @UseInterceptors(ResponseInterceptor)
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req: any) {
    return await this.authService.login(req.user);
  }

  @Get('auth/verify-token')
  async validate(@Request() req: any, @Res() res: Response) {
    const token = req.headers.authorization.split(' ')[1];
    const validateToken = this.authService.validateToken(token);
    return this.utils.adaptResponse(validateToken, res);
  }

  @Public()
  @Get('health-check')
  healthCheck(
    @Res() res: Response,
  ) {
    return res.status(200).json({ status: 'ok' });
  }
}
