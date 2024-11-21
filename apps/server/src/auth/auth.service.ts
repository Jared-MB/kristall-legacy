import { User } from '@/server/entities';
import { ShopService } from '@/server/modules/shops/services';
import { StripeService } from '@/server/modules/stripe/services';
import { FindUserResult, UsersService } from '@/server/modules/users/services';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private shopsService: ShopService,
    private jwtService: JwtService,
    private stripeService: StripeService,
  ) { }

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
    if (!user) return null;
    if (!user.password) return null;
    let isMatch = false;
    try {
      isMatch = await bcrypt.compare(password, user.password);
    } catch (err) {
      return null;
    }
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userParam: any) {
    const user: User = userParam;
    const userShop = await this.shopsService.getShopById(user.shop._id);
    if (!userShop) return null;
    let subscription = {
      isSubscribed: false,
      hasCanceled: false,
    };
    let isSubscribedUntil = null;
    try {
      subscription = await this.stripeService.isUserSubscribed(user.stripeId);
      isSubscribedUntil = await this.stripeService.getUserCurrentPeriod(
        user.stripeId,
      );
    } catch (err) {
      console.log('Error getting user subscription status', err);
    }
    const formattedUser = {
      ...user,
      subscription: {
        ...subscription,
        isSubscribedUntil,
      },
      shop: {
        name: userShop.name,
        _id: userShop._id,
        image: userShop.image || undefined,
        publicPage: userShop.publicPage || undefined,
      },
    };
    const { password, createdAt, ...result } = formattedUser;
    return {
      _id: user._id,
      username: user.username,
      access_token: this.jwtService.sign(result, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async validateToken(token: string) {
    const decoded = this.jwtService.verify(token);
    const { exp, iat, ...result } = decoded;
    return result;
  }
}
