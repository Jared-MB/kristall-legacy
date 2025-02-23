import { Public } from '@/server/decorators/public.decorator';
import { ResponseInterceptor } from '@/server/interceptors';
import { Utils } from '@/server/utilities';
import {
  Body,
  Controller,
  Get,
  Headers,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  RawBodyRequest,
  Req,
  Res,
  UnauthorizedException,
  UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cookies } from 'src/decorators';
import { UsersService } from 'src/modules/users/services/users.service';
import { AuthService } from 'src/services';
import { StripeService } from '../services/stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly utils: Utils,
  ) { }

  @Public()
  @Get('/prices')
  async getPrices(@Res() res: Response) {
    const prices = this.stripeService.getPrices();
    return this.utils.adaptResponse(prices, res, {
      message: 'Prices found',
      status: 201,
    });
  }

  @Public()
  @UseInterceptors(ResponseInterceptor)
  @Get('sessionId/:id')
  async getSessionById(@Param('id') id: string) {
    const session = await this.stripeService.getSessionById(id);
    return session
  }

  @UseInterceptors(ResponseInterceptor)
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
      throw new UnauthorizedException('Invalid password')
    }

    if (body.email !== user.email){
      throw new UnauthorizedException('Invalid email')
    }

    try {
      await this.stripeService.cancelSubscription(user.email);
    }
    catch (error) {
      if (error instanceof Error){
        throw new InternalServerErrorException(error.message)
      }
      throw new InternalServerErrorException('Error al cancelar la suscripción')
    }
    return 'ok'
  }

  @UseInterceptors(ResponseInterceptor)
  @Get('/user')
  async getStripeAccountByUser(@Cookies('session') session: string){
    const user = this.authService.decodeCookie(session);

    if (!user){
      throw new UnauthorizedException()
    }

    return await this.stripeService.getUserSubscription(user.stripeId);
  }

  @Get('customer/:id')
  async getCostumerById(@Param() param: any, @Res() res: Response) {
    const costumer = this.stripeService.getCostumerById(param.id);
    return this.utils.adaptResponse(costumer, res, {
      message: 'Costumer found',
      status: 201,
    });
  }

  @Get('/customer/:email')
  async getCostumer(@Param() param: any, @Res() res: Response) {
    const costumer = this.stripeService.getCostumerByEmail(param.email);
    return this.utils.adaptResponse(costumer, res, {
      message: 'Costumer found',
      status: 201,
    });
  }

  @Public()
  @Post('/checkout-session')
  async createCheckout(@Body() body: any, @Res() res: Response) {
    const session = this.stripeService.createCheckoutSession(body.priceId);
    return this.utils.adaptResponse(session, res);
  }

  @Public()
  @Post('/webhook')
  async webhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
    @Res() res: Response,
  ) {
    const event = this.stripeService.webhook(req.rawBody as Buffer, sig);
    return this.utils.adaptResponse(event, res);
  }
}
