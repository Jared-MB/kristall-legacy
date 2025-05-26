import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Put,
  Request,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';

import { UsersService } from 'src/modules/users/services/users.service';
import { StripeService } from '../services/stripe.service';

import { ResponseInterceptor } from 'src/interceptors';
import { AuthRequest } from 'src/interfaces/requests';

@UseInterceptors(ResponseInterceptor)
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly usersService: UsersService,
  ) { }  

  @Get('/user')
  async getStripeAccountByUser(@Request() req: AuthRequest){
    const user = req.user;
    return await this.stripeService.getUserSubscription(user._id);
  }

  @Get('history')
  async getStripeUserPaymentHistory(@Request() req: AuthRequest) {
    const user = req.user;
   return await this.stripeService.getUserPaymentHistory(user._id);
  }  

  @Put('/cancel-subscription')
  async cancelSubscription(
    @Body() body: { password: string, email: string },
    @Request() req: AuthRequest,
  ) {
    const user = req.user;

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
