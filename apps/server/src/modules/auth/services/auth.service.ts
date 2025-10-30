import { ShopService } from '@/server/modules/shops/services';
import { StripeService } from '@/server/modules/stripe/services';
import { FindUserResult, UsersService } from '@/server/modules/users/services';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PaymentRequiredException } from 'src/exceptions/payment-required.exception';
import { AuthRequest } from 'src/interfaces/requests';
import { CacheService } from 'src/services/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private shopsService: ShopService,
    private jwtService: JwtService,
    private stripeService: StripeService,
    private cacheService: CacheService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    let user: FindUserResult | null;

    try {
      user = await this.usersService.findUserByUsername({
        username,
        showPassword: true,
      });
    } catch (err) {
      return null;
    }

    if (!user || !user?.password) return null;

    let isMatch = false;

    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      return null;
    }

    if (!isMatch) {
      return null;
    }

    const { password: _password, ...result } = user;
    return result;
  }

  async login(user: AuthRequest['user']) {
    const userShop = await this.shopsService.getShopById(user.shop._id);
    if (!userShop) return null;

    const isStripeIdOnCache = await this.cacheService.get<string>(
      user._id,
      'id',
    );
    if (!isStripeIdOnCache) {
      await this.cacheService.set(user._id, user.stripeId, 'id');
    }

    const userSubscription = await this.stripeService.getUserSubscription(
      user._id,
    );
    if (userSubscription.status === 'none') {
      throw new PaymentRequiredException('No tienes una suscripción a Stripe');
    }

    if (userSubscription.status !== 'active') {
      throw new PaymentRequiredException(
        'Tu suscripción a Stripe no está activa',
      );
    }

    return {
      _id: user._id,
      username: user.username,
      access_token: this.jwtService.sign(
        {
          _id: user._id,
          username: user.username,
          shop: { _id: userShop._id },
          role: user.role,
        },
        {
          secret: process.env.JWT_SECRET,
        },
      ),
    };
  }

  async validateToken(token: string) {
    const decoded = this.jwtService.verify(token);
    const { exp, iat, ...result } = decoded;
    return result;
  }
}
