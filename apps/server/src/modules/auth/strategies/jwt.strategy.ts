import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTUser, RequestUser } from 'src/entities';
import { ShopService } from 'src/modules/shops/services/shop.service';
import { StripeService } from 'src/modules/stripe/services/stripe.service';
import { UsersService } from 'src/modules/users/services/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly stripeService: StripeService,
    private readonly usersService: UsersService,
    private readonly shopsService: ShopService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTUser): Promise<RequestUser> {
    const user = await this.usersService.findUserById({ _id: payload._id });

    if (!user) {
      throw new UnauthorizedException();
    }

    const [userShop] = await Promise.all([
      await this.shopsService.getShopById(user.shop._id),
      await this.stripeService.verifyUserSubscription(user._id, user.stripeId),
    ]);

    if (!userShop) {
      throw new UnauthorizedException();
    }

    return {
      _id: payload._id,
      username: payload.username,
      shop: {
        _id: payload.shop._id,
      },
      role: payload.role,
      email: user.email,
      permissions: user.permissions,
      plan: user.package,
      stripeId: user.stripeId,
    };
  }
}
