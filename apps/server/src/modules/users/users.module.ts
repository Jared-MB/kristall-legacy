import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '@kristall/server/src/auth/jwt.strategy';
import { User } from '@kristall/server/src/entities';
import { FirebaseService } from '@kristall/server/src/firebase';
import { LocationsModule } from '@kristall/server/src/locations/locations.module';
import { BankAccountsModule, ShopsModule, StripeModule } from '@kristall/server/src/modules';
import { AuthService, UtilsService } from '@kristall/server/src/services';
import { TokenService } from '@kristall/server/src/utilities';
import { Utils } from '@kristall/server/src/utilities/Utils';
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
