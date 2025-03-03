import { Module } from '@nestjs/common';

import { UsersModule } from 'src/modules/users/users.module';

import { StripeController } from './controllers/stripe.controller';
import { StripePublicController } from './controllers/stripe.public.controller';

import { AuthService } from 'src/services/auth.service';
import { CacheService } from 'src/services/cache.service';
import { StripeService } from './services/stripe.service';

import { StripeRepository } from './repositories/stripe.repository';

@Module({
    imports: [UsersModule],
    controllers: [StripeController, StripePublicController],
    providers: [StripeService, AuthService, CacheService, StripeRepository],
    exports: [StripeService],
})
export class StripeModule { }
