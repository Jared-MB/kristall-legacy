import { Injectable } from "@nestjs/common";

import Stripe from "stripe";

import { CacheService } from "src/services/cache.service";

@Injectable()
export class StripeRepository {

  private readonly stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
    apiVersion: '2022-11-15',
  });

  constructor(
    private readonly cacheService: CacheService,
  ){ }

  public async fetchUserSubscription(userStripeId: string){
    return await this.stripe.subscriptions.list({
      customer: userStripeId,
      limit: 1,
      status: "all",
      expand: ["data.default_payment_method"],
    });
  }

  public async getPlanByPriceId(priceId: string){
    const cachedPlan = await this.cacheService.get<Stripe.Price>(priceId, 'priceId')

    if (cachedPlan){
      console.log('[CACHE][STRIPE][HIT] Full turbo >>>>')
      return cachedPlan
    }

    console.log('[CACHE][STRIPE][MISS]')
    const plan = await this.stripe.prices.retrieve(priceId);
    await this.cacheService.set(priceId, plan, 'priceId')

    return plan
  }

}