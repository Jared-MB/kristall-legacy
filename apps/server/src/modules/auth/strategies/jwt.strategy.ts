import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTUser, RequestUser } from 'src/entities';
import { UsersService } from 'src/modules/users/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService
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

    return { 
      _id: payload._id, 
      username: payload.username, 
      shop: { 
        _id: payload.shop._id 
      },
      role: payload.role,
      email: user.email,
      permissions: user.permissions,
      package: user.package,
      stripeId: user.stripeId
    };
  }
}
