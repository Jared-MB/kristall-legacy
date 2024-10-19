import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { Utils } from 'src/utilities/Utils';
import { UsersModule } from '..';
import { StripeController } from './controllers';
import { StripeService } from './services';

@Module({
    imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UsersModule)],
    controllers: [StripeController],
    providers: [StripeService, Utils],
    exports: [StripeService],
})
export class StripeModule { }
