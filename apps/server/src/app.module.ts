import { CacheModule } from '@nestjs/cache-manager';
import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminModule } from './admin/admin.module';
import { ClientsModule } from './clients/clients.module';
import { ExpensesModule } from './expenses/expenses.module';
import { LocationsModule } from './modules/locations/locations.module';

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
import { AuthModule } from './modules/auth/auth.module';
import { CloudflareModule } from './modules/cloudflare/cloudflare.module';

import { AppController } from './app.controller';

import { Utils } from './utilities';

import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

import { createKeyv } from '@keyv/redis';
import { CacheableMemory } from 'cacheable';
import { Keyv } from 'keyv';
import { VercelModule } from './modules/vercel/vercel.module';

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        (() => {
          if (process.env.NODE_ENV?.trim() === 'test') {
            return '.env.test';
          }
          if (process.env.NODE_ENV?.trim() === 'development') {
            return '.env.development';
          }
          return '.env';
        })(),
      ],
      isGlobal: true
    }),
    CacheModule.register({
      useFactory: async () => {
        return {
          stores: [
            new Keyv({
              store: new CacheableMemory({ lruSize: 5000 }),
            }),
            createKeyv(process.env.REDIS_URL),
          ],
        };
      },
      isGlobal: true,
      ttl: ONE_DAY_MS
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
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
    CloudflareModule,
    VercelModule,
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
export class AppModule implements OnModuleInit { 
  onModuleInit() {
    console.log(`
      
      _____________________________________________________________________
           _    _    _____      __      __    ______    ___     _       _   
           /  ,'     /    )     /     /    )    /       / |     /       /   
          /_.'      /___ /     /      \\        /       /__|    /       /    
         /  \\      /    |     /        \\      /       /   |   /       /     
        /    \\    /     |   _/_    (____/    /       /    |  /____/  /____/
      _____________________________________________________________________
                                        

    `);
  }
}
