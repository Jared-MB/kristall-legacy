import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { User } from 'src/entities';
import { FirebaseService } from 'src/firebase';
import { LocationsModule } from 'src/locations/locations.module';
import { BankAccountsModule, ShopsModule, StripeModule } from 'src/modules';
import { AuthService, UtilsService } from 'src/services';
import { TokenService } from 'src/utilities';
import { Utils } from 'src/utilities/Utils';
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
