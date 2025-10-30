import { ShopService } from '@/server/modules/shops/services/shop.service';
import { StripeService } from '@/server/modules/stripe/services/stripe.service';
import {
  FindUserResult,
  UsersService,
} from '@/server/modules/users/services/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthRequest } from 'src/interfaces/requests';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private shopsService: ShopService,
    private jwtService: JwtService,
    private stripeService: StripeService,
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

    await this.stripeService.verifyUserSubscription(user._id, user.stripeId);

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
    const decoded = this.jwtService.verify<{
      _id: string;
      username: string;
      shop: { _id: string };
      role: string;
      exp: number;
      iat: number;
    }>(token);
    const { exp, iat, ...result } = decoded;

    return result;
  }
}
