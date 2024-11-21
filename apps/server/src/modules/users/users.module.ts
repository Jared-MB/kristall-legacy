import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '@/server/auth/jwt.strategy';
import { User } from '@/server/entities';
import { FirebaseService } from '@/server/firebase';
import { LocationsModule } from '@/server/locations/locations.module';
import { BankAccountsModule, ShopsModule, StripeModule } from '@/server/modules';
import { AuthService, UtilsService } from '@/server/services';
import { TokenService } from '@/server/utilities';
import { Utils } from '@/server/utilities/Utils';
import { UsersAuthController, UsersController } from './controllers';
import { UsersService } from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ShopsModule,
        LocationsModule,
        StripeModule,
        BankAccountsModule
    ],
    controllers: [UsersAuthController, UsersController],
    providers: [UsersService, JwtStrategy, Utils, TokenService, FirebaseService, AuthService, UtilsService],
    exports: [UsersService],
})
export class UsersModule { }
