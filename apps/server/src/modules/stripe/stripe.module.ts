import { User } from '@/server/entities';
import { Utils } from '@/server/utilities/Utils';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/services';
import { UsersModule } from '..';
import { StripeController } from './controllers';
import { StripeService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UsersModule)],
    controllers: [StripeController],
    providers: [StripeService, Utils, AuthService],
    exports: [StripeService],
})
export class StripeModule { }
