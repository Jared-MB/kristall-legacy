import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  RawBodyRequest,
  Req,
  Res,
  UseInterceptors
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Public } from '@kristall/server/src/decorators/public.decorator';
import { ResponseInterceptor } from '@kristall/server/src/interceptors';
import { Utils } from '@kristall/server/src/utilities';
import { StripeService } from '../services/stripe.service';
@Controller('stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
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

  @UseInterceptors(new ResponseInterceptor())
  @Public()
  @Get('sessionId/:id')
  async getSessionById(@Param('id') id: string) {
    const session = await this.stripeService.getSessionById(id);
    // const hasAlreadyRegister = await this.stripeService.getCostumerByEmail
    return session
  }

  @Put('/cancel-subscription/:id')
  async cancelSuscription(
    @Param('id') id: string,
    @Body() body: any,
    @Res() res: Response,
    @Headers('authorization') auth: string,
  ) {
    const subscription = this.stripeService.cancelSubscription(id, body, auth);
    return this.utils.adaptResponse(subscription, res, {
      message: 'Subscription canceled',
      status: 201,
    });
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
