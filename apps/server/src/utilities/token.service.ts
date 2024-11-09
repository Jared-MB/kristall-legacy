import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SaveUser, Shop } from '@/server/entities';

/**
 * @deprecated
 */
@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) { }

  verifyToken(token: string, shopID: string) {
    const decodedToken = this.jwtService.decode(token.split(' ')[1]);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Unauthorized');
    }
    if (decodedToken.shop._id !== shopID) {
      throw new Error('Unauthorized');
    }
    return decodedToken;
  }

  public decodeCookie(cookie: string): SaveUser | null {
    const decodedToken = this.jwtService.decode(cookie);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Unauthorized');
    }
    return decodedToken as SaveUser;
  }

  public decode(token: string): SaveUser | null {
    const decodedToken = this.jwtService.decode(token.split(' ')[1]);
    if (!decodedToken || typeof decodedToken !== 'object') {
      throw new Error('Unauthorized');
    }
    return decodedToken as SaveUser;
  }

  public getShop(token: string): Shop | null {
    const decodedToken = this.decode(token);
    if (!decodedToken) {
      return null;
    }
    return decodedToken.shop;
  }
}
