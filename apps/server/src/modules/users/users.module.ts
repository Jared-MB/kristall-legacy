import { User } from '@/server/entities';
import { StripeModule } from '@/server/modules/stripe/stripe.module';
import { BankAccountsModule } from '@/server/modules/bank-accounts/bank-accounts.module';
import { ShopsModule } from '@/server/modules/shops/shops.module';
import { JwtStrategy } from '@/server/modules/auth/strategies/jwt.strategy';
import { AuthService, UtilsService } from '@/server/services';
import { TokenService } from '@/server/utilities';
import { Utils } from '@/server/utilities/Utils';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from 'src/modules/locations/locations.module';
import { CacheService } from 'src/services/cache.service';
import { UsersController } from './controllers/users.controller';
import { UsersAuthController } from './controllers/users-auth.controller';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ShopsModule,
    LocationsModule,
    BankAccountsModule,
    forwardRef(() => StripeModule),
  ],
  controllers: [UsersAuthController, UsersController],
  providers: [
    UsersService,
    JwtStrategy,
    Utils,
    TokenService,
    AuthService,
    UtilsService,
    UserRepository,
    CacheService,
  ],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
