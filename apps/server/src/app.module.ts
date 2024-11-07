import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { ExpensesModule } from './expenses/expenses.module';
import { LocationsModule } from './locations/locations.module';

import {
  AnalyticsModule,
  BankAccountsModule,
  CategoriesModule,
  ImageModule,
  NotesModule,
  OrdersModule,
  ProductsModule,
  ReportsModule,
  SettingsModule,
  ShopsModule,
  StripeModule,
  UsersModule,
  VirtualShowroomModule
} from './modules';

import { AppController } from './app.controller';

import { Utils } from './utilities';

import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local', '.env.mobile'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST ?? 'localhost',
      port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities: true,
      synchronize: true
    }),
    AuthModule,
    UsersModule,
    ShopsModule,
    ProductsModule,
    ClientsModule,
    OrdersModule,
    LocationsModule,
    AdminModule,
    StripeModule,
    ImageModule,
    NotesModule,
    ExpensesModule,
    BankAccountsModule,
    CategoriesModule,
    AnalyticsModule,
    VirtualShowroomModule,
    SettingsModule,
    ReportsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    Utils,
  ],
})
export class AppModule { }
