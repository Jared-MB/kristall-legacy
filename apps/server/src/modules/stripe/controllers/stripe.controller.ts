import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';

import { UsersService } from 'src/modules/users/services/users.service';
import { AuthService } from 'src/services/auth.service';
import { StripeService } from '../services/stripe.service';

import { Cookies } from 'src/decorators';
import { ResponseInterceptor } from 'src/interceptors';

@UseInterceptors(ResponseInterceptor)
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) { }  

  @Get('/user')
  async getStripeAccountByUser(@Cookies('session') session: string){
    const user = this.authService.decodeCookie(session);

    if (!user){
      throw new UnauthorizedException()
    }

    return await this.stripeService.getUserSubscription(user._id);
  }

  @Get('history')
  async getStripeUserPaymentHistory(@Cookies('session') session: string) {
    const user = this.authService.decodeCookie(session);
    if (!user){
      throw new UnauthorizedException()
    }
    const paymentHistory = await this.stripeService.getUserPaymentHistory(user.stripeId);
    return paymentHistory
  }  

  @Put('/cancel-subscription')
  async cancelSubscription(
    @Body() body: { password: string, email: string },
    @Cookies('session') session: string,
  ) {
    const user = this.authService.decodeCookie(session);
    if (!user){
      throw new UnauthorizedException()
    }

    const isPasswordValid = await this.usersService.comparePassword(user._id, body.password)
    if (!isPasswordValid){
      throw new UnauthorizedException('Invalid credentials')
    }

    if (body.email !== user.email){
      throw new UnauthorizedException('Invalid credentials')
    }

    try {
      await this.stripeService.cancelSubscription(user._id);
    }
    catch (error) {
      if (error instanceof Error){
        throw new InternalServerErrorException(error.message)
      }
      throw new InternalServerErrorException('Error al cancelar la suscripción')
    }
    return 'ok'
  }
}
