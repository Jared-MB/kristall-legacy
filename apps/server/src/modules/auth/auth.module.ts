import { UsersModule } from '@/server/modules/users/users.module';
import { ShopsModule } from '@/server/modules/shops/shops.module';
import { StripeModule } from '@/server/modules/stripe/stripe.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

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
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
