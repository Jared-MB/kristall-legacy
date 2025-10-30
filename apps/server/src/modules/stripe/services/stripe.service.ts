import { User } from '@/server/entities';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { UserRepository } from 'src/modules/users/repositories/user.repository';
import { CacheService } from 'src/services/cache.service';
import { StripeUserSubscription } from '../interfaces';
import { StripeRepository } from '../repositories/stripe.repository';
import { PaymentRequiredException } from 'src/exceptions/payment-required.exception';

const FIVE_MINUTES = 5 * 60 * 1000;

@Injectable()
export class StripeService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cacheService: CacheService,
    private readonly stripeRepository: StripeRepository,
  ) {}

  private getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
      apiVersion: '2022-11-15',
    });
  }

  private async getStripeId(userId: string) {
    let stripeId = await this.cacheService.get<string>(userId, 'id');
    if (!stripeId) {
      const user = await this.userRepository.findById(userId);

      if (!user) {
        return null;
      }

      stripeId = user.stripeId;
    }

    return stripeId;
  }

  async getUserPaymentHistory(userId: string): Promise<Stripe.PaymentIntent[]> {
    const stripeId = await this.getStripeId(userId);

    if (!stripeId) {
      return [];
    }

    const stripe = this.getStripe();
    const paymentHistory = await stripe.paymentIntents.list({
      customer: stripeId,
      limit: 5,
    });

    return paymentHistory.data;
  }

  async getSessionById(id: string) {
    try {
      return await this.getStripe().checkout.sessions.retrieve(id);
    } catch (error) {
      return null;
    }
  }

  async verifyUserSubscription(userId: string, stripeId: string) {
    const isStripeIdOnCache = await this.cacheService.get<string>(userId, 'id');
    if (!isStripeIdOnCache) {
      await this.cacheService.set(userId, stripeId, 'id');
    }

    const userSubscription = await this.getUserSubscription(userId);

    if (userSubscription.status === 'none') {
      throw new PaymentRequiredException('No tienes una suscripción a Stripe');
    }

    if (userSubscription.status !== 'active') {
      throw new PaymentRequiredException(
        'Tu suscripción a Stripe no está activa',
      );
    }
  }

  /**
   * Get stripe user subscription
   *
   * It will check first the value in cache, if not found, it will get the value from stripe
   * @param userId The user id - **NOT THE STRIPE ID**
   *
   * @cached
   */
  async getUserSubscription(userId: string): Promise<StripeUserSubscription> {
    const subscriptionsCached =
      await this.cacheService.get<StripeUserSubscription>(userId);

    if (subscriptionsCached) {
      return subscriptionsCached;
    }

    const stripeId = await this.getStripeId(userId);

    if (!stripeId) {
      return { status: 'none' };
    }

    const subscriptions = await this.stripeRepository.fetchUserSubscription(
      stripeId,
    );

    if (subscriptions.data.length === 0) {
      const subscriptionData = { status: 'none' } as const;
      await this.cacheService.set(
        userId,
        subscriptionData,
        'stripe',
        FIVE_MINUTES,
      );
      return subscriptionData;
    }

    const subscription = subscriptions.data[0];

    const subscriptionData: StripeUserSubscription = {
      subscriptionId: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      currentPeriodEnd: subscription.current_period_end,
      currentPeriodStart: subscription.current_period_start,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      paymentMethod:
        subscription.default_payment_method &&
        typeof subscription.default_payment_method !== 'string'
          ? {
              brand: subscription.default_payment_method.card?.brand ?? null,
              last4: subscription.default_payment_method.card?.last4 ?? null,
            }
          : null,
    };

    await this.cacheService.set(userId, subscriptionData, 'stripe');
    return subscriptionData;
  }

  async getUserCurrentPeriod(stripeId: string) {
    const stripe = this.getStripe();
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeId,
    });
    const subscription = subscriptions.data[0];
    return subscription.current_period_end * 1000;
  }

  async cancelSubscription(userId: string) {
    const stripe = this.getStripe();

    const subscription = await this.getUserSubscription(userId);

    if (!subscription || subscription.status === 'none') {
      throw new Error('No se encontró la suscripción');
    }

    try {
      return await stripe.subscriptions.update(subscription.subscriptionId, {
        cancel_at_period_end: true,
      });
    } catch (error) {
      throw new Error('Error al cancelar la suscripción');
    }
  }

  async getPrices(): Promise<Stripe.Price[]> {
    const stripe = this.getStripe();

    const prices = await stripe.prices.list({
      currency: 'MXN',
      active: true,
    });

    return prices.data;
  }

  async getCostumerById(id: string) {
    const stripe = this.getStripe();
    const costumer = await stripe.customers.retrieve(id);
    const costumerSubscriptions = await stripe.subscriptions.list({
      customer: id,
    });
    return { costumer, costumerSubscriptions };
  }

  async getCostumerByEmail(email: string) {
    const stripe = this.getStripe();
    const costumers = await stripe.customers.list({ email });
    return costumers.data[0];
  }

  async createStripeAdminUser(
    user: Pick<User, 'name' | 'email' | 'stripeId' | 'package'>,
  ) {
    const _id = randomUUID();
    const password = await this.createTemporalStripePassword(
      user.name,
      user.package,
    );
    const newUser = await this.userRepository.create({
      ...user,
      _id,
      role: 'admin',
      permissions: 'all',
      password,
    });
    const userSaved = await this.userRepository.save(newUser);
    return userSaved;
  }

  async createCheckoutSession(priceId: string) {
    const session = await this.getStripe().checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.DASHBOARD_URL}/register?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/pricing`,
    });
    return {
      url: session.url,
    };
  }

  async createTemporalStripePassword(name: string, userPackage: string) {
    let password = '';
    name.split(' ').forEach((word) => {
      password += word.substring(0, 2).toLowerCase();
    });
    password += `_${userPackage.toLowerCase()}`;
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }

  async webhook(body: Buffer, sig: string) {
    let event: Stripe.Event;

    try {
      event = this.getStripe().webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET ?? '',
      );
    } catch (err) {
      // On error, log and return the error message
      console.log(`❌ Error message: ${err.message}`);
      throw new Error(`Webhook Error: ${err.message}`);
    }

    // Cast event data to Stripe object
    switch (event.type) {
      // case 'charge.succeeded': {
      //   console.log(event.data);
      //   break;
      // }
      case 'customer.subscription.created':
        // console.log(3);
        // console.log(event.data.object);
        // Handle subscription creation event
        break;
      case 'customer.subscription.updated': {
        // setTimeout(async () => {
        //   const stripe: Stripe.Subscription = event.data
        //     .object as Stripe.Subscription;
        //   const customer = stripe.customer as string;
        //   const user = await this.findUserByStripeId(customer);
        //   const productId = (stripe as any).plan.product as string;
        //   const product = await this.getStripe().products.retrieve(productId);
        //   const password = await this.createTemporalStripePassword(
        //     user.name,
        //     product.name.toLowerCase(),
        //   );
        //   const updatedUser: User = {
        //     ...user,
        //     password,
        //     package: product.name.toLowerCase(),
        //   };
        //   await this.usersRepository.update({ _id: user._id }, updatedUser);
        //   // await this.usersService.updateUser(user._id, updatedUser);
        // }, 10000);
        // Handle subscription update event
        break;
      }
      // case 'customer.subscription.deleted':
      //   console.log(event.data.object);
      //   // Handle subscription deletion event
      //   break;
      case 'invoice.payment_succeeded': {
        // console.log(event.data.object)
        const stripe: Stripe.PaymentIntent = event.data
          .object as Stripe.PaymentIntent;
        const customer = stripe.customer as string;
        const customerData = (await this.getStripe().customers.retrieve(
          customer,
        )) as unknown as Stripe.Customer;
        const subscription = await this.getStripe().subscriptions.retrieve(
          (stripe as any).subscription,
        );
        const subscriptionProduct = (subscription as any).plan.product;
        const product = await this.getStripe().products.retrieve(
          subscriptionProduct,
        );
        await this.createStripeAdminUser({
          email: customerData.email as string,
          name: customerData.name as string,
          stripeId: customer,
          package: product.name.toLowerCase() as User['package'],
        });
        // Handle successful payment event
        break;
      }
      case 'invoice.payment_failed':
        console.log(4);
        //   console.log(event.data.object);
        //   // Handle payment failure event
        break;
      // case 'customer.subscription.trial_will_end':
      //   console.log(event.data.object);
      //   // Handle trial ending event
      //   break;
      // case 'customer.subscription.ended':
      //   console.log(event.data.object);
      //   // Handle subscription ending event
      //   break;
      // case 'customer.subscription.past_due':
      //   console.log(event.data.object);
      //   // Handle past-due subscription event
      //   break;
      // case 'customer.subscription.pending_update':
      //   console.log(event.data.object);
      //   // Handle pending subscription update event
      //   break;
      // case 'invoice.upcoming':
      //   console.log(event.data.object);
      //   // Handle upcoming invoice event
      //   break;
      // case 'invoice.created':
      //   console.log(event.data.object);
      //   // Handle invoice creation event
      //   break;
      // case 'invoice.finalized':
      //   console.log(event.data.object);
      //   // Handle finalized invoice event
      //   break;
      default:
      // console.log(`Unhandled event type: ${event.type}`);
    }

    // Return a response to acknowledge receipt of the event
    return { received: true };
  }
}
