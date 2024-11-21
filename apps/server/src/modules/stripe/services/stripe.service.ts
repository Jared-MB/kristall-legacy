import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/server/entities';
import { ServerError } from '@/server/utilities/Errors';
import Stripe from 'stripe';

import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly jwt: JwtService,
  ) { }

  private getStripe() {
    return new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
      apiVersion: '2022-11-15',
    });
  }

  async getSessionById(id: string) {
    return await this.getStripe().checkout.sessions.retrieve(id);
  }

  async isUserSubscribed(stripeId: string) {
    const stripe = this.getStripe();
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeId,
    });
    const hasCanceled = subscriptions.data[0].cancel_at_period_end;
    return {
      isSubscribed: subscriptions.data.length > 0,
      hasCanceled,
    };
  }

  async getUserCurrentPeriod(stripeId: string) {
    const stripe = this.getStripe();
    const subscriptions = await stripe.subscriptions.list({
      customer: stripeId,
    });
    const subscription = subscriptions.data[0];
    return subscription.current_period_end * 1000;
  }

  async cancelSubscription(
    _id: string,
    body: { email: string; password: string },
    auth: string,
  ) {
    const decode = this.jwt.decode(auth.replace('Bearer ', ''));
    if (!decode || typeof decode === 'string' || decode._id !== _id) {
      throw new ServerError('Invalid or missing token', 401);
    }
    const user = await this.usersRepository.findOne({
      where: { _id },
      relations: {
        shop: {
          image: true,
        },
      },
    });
    if (!user) {
      throw new ServerError('Bad request', 400);
    }
    let match = false;
    try {
      match = await bcrypt.compare(body.password, user.password as string);
    } catch (err) {
      console.log(err);
      throw new ServerError('Server error', 500);
    }
    if (!match) {
      throw new ServerError('Invalid password', 401);
    }
    const stripe = this.getStripe();
    const costumer = await this.getCostumerByEmail(body.email);
    const subscriptions = await stripe.subscriptions.list({
      customer: costumer.id,
    });
    const subscription = subscriptions.data[0];
    const deleted = await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });
    return deleted;
  }

  async getPrices() {
    const stripe = this.getStripe();
    const prices = await stripe.prices.list({
      currency: 'MXN',
      active: true,
    });
    const realPrices = [] as Stripe.Price[];
    for (const price of prices.data) {
      const productIndex = realPrices.findIndex(
        (p) => p.product === price.product,
      );
      if (productIndex === -1) {
        realPrices.push(price);
      } else {
        if (
          (realPrices[productIndex].unit_amount as number) <
          (price.unit_amount as number)
        ) {
          realPrices[productIndex] = price;
        }
      }
    }
    return realPrices;
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
    const newUser = this.usersRepository.create({
      ...user,
      _id,
      role: 'admin',
      permissions: 'all',
      password,
    });
    const userSaved = await this.usersRepository.save(newUser);
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

  async findUserByStripeId(stripeId: string) {
    const user = await this.usersRepository.findOne({
      where: { stripeId },
      relations: {
        shop: {
          image: true,
        },
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const { password, ...result } = user;
    return result;
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
          package: product.name.toLowerCase() as User['package']
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
