import { ShopsModule, StripeModule, UsersModule } from '@/server/modules';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CacheService } from 'src/services/cache.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        (() => {
          if (process.env.NODE_ENV?.trim() === 'test') {
            return '.env.test';
          }
          return '.env.development';
        })(),
      ],
    }),
    UsersModule,
    StripeModule,
    ShopsModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      global: true,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, CacheService],
  exports: [AuthService],
})
export class AuthModule { }
