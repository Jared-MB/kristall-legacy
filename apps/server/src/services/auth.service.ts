import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SaveUser } from 'src/entities';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService
    ) { }

    public decodeCookie(cookie: string): SaveUser | null {
        const decodedToken = this.jwtService.decode(cookie);
        if (!decodedToken || typeof decodedToken !== 'object') {
            return null
        }
        return decodedToken as SaveUser;
    }
}
