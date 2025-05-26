import { User } from '@/server/entities';
import { LocationsModule } from '@/server/locations/locations.module';
import { BankAccountsModule, ShopsModule } from '@/server/modules';
import { JwtStrategy } from '@/server/modules/auth/strategies/jwt.strategy';
import { AuthService, UtilsService } from '@/server/services';
import { TokenService } from '@/server/utilities';
import { Utils } from '@/server/utilities/Utils';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheService } from 'src/services/cache.service';
import { UsersAuthController, UsersController } from './controllers';
import { UserRepository } from './repositories/user.repository';
import { UsersService } from './services';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        ShopsModule,
        LocationsModule,
        BankAccountsModule
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
        CacheService
    ],
    exports: [UsersService, UserRepository],
})
export class UsersModule { }
