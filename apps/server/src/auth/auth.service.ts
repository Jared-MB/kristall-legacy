import { User } from '@/server/entities';
import { ShopService } from '@/server/modules/shops/services';
import { StripeService } from '@/server/modules/stripe/services';
import { FindUserResult, UsersService } from '@/server/modules/users/services';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CacheService } from 'src/services/cache.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private shopsService: ShopService,
    private jwtService: JwtService,
    private stripeService: StripeService,
    private cacheService: CacheService
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

  async login(user: User) {
    const userShop = await this.shopsService.getShopById(user.shop._id);
    if (!userShop) return null;

    const isStripeIdOnCache = await this.cacheService.get<string>(user._id, 'id')
    if (!isStripeIdOnCache){
      await this.cacheService.set(user._id, user.stripeId, 'id')
    }

    const userSubscription = await this.stripeService.getUserSubscription(user._id)
    if (userSubscription.status === 'none'){
      return null
    }

    if (userSubscription.status !== 'active'){
      return null
    }

    const formattedUser = {
      ...user,
      shop: {
        name: userShop.name,
        _id: userShop._id,
        image: userShop.image || undefined,
        virtualShowroom: userShop?.virtualShowroom || undefined,
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
