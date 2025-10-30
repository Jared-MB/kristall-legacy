import {
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Cookies, Public } from 'src/decorators';
import { ResponseInterceptor } from 'src/interceptors';
import { AuthRequest } from 'src/interfaces/requests';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@UseInterceptors(ResponseInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Get('verify-token')
  async validate(@Cookies('session') session: string) {
    return await this.authService.validateToken(session);
  }

  @Public()
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthRequest) {
    return await this.authService.login(req.user);
  }
}
