import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalyticsController } from './controllers';

import { TokenService, Utils } from '@/server/utilities';
import { AnalyticsService } from './services';

import { Expense, Note, Order, Payment, Product } from '@/server/entities';

@Module({
    imports: [TypeOrmModule.forFeature([
        Order,
        Note,
        Product,
        Payment,
        Expense
    ])],
    providers: [AnalyticsService, Utils, TokenService],
    controllers: [AnalyticsController]
})
export class AnalyticsModule { }
