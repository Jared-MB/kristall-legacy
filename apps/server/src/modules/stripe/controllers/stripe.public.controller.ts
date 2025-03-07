import { Body, Controller, Get, Headers, Param, Post, RawBodyRequest, Req, UseInterceptors } from "@nestjs/common";

import { StripeService } from "../services";

import { CacheInterceptor, CacheKey } from "@nestjs/cache-manager";
import { Request } from "express";
import { Public } from "src/decorators";
import { ResponseInterceptor } from "src/interceptors";
import { StripeRepository } from "../repositories/stripe.repository";

@Public()
@UseInterceptors(ResponseInterceptor)
@Controller('stripe')
export class StripePublicController {

  constructor(
    private readonly stripeService: StripeService,
    private readonly stripeRepository: StripeRepository,
  ) {}

  @CacheKey('stripe:prices')
  @UseInterceptors(CacheInterceptor)
  @Get('/prices')
  async getPrices() {
    return await this.stripeService.getPrices();
  }

  @Get('/price/:id')
  async getPrice(@Param('id') id?: string) {
    if (!id) return null;
    return await this.stripeRepository.getPlanByPriceId(id);
  }

  @Get('sessionId/:id')
  async getSessionById(@Param('id') id: string) {
    const session = await this.stripeService.getSessionById(id);
    return session
  }

  @Post('/checkout-session')
  async createCheckout(@Body() body: any) {
    return await this.stripeService.createCheckoutSession(body.priceId);
  }

  @Post('/webhook')
  async webhook(
    @Headers('stripe-signature') sig: string,
    @Req() req: RawBodyRequest<Request>,
  ) {
    return await this.stripeService.webhook(req.rawBody as Buffer, sig);
  }

}