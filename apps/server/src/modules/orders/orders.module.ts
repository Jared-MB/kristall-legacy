import { ClientsService } from '@/server/clients/clients.service';
import {
  Cancellation,
  Client,
  Location,
  LocationProduct,
  Order,
  Payment,
  Product,
  ProductOrder
} from '@/server/entities';
import { BankAccountsModule, ProductsModule } from '@/server/modules';
import { ShopsModule } from '@/server/modules/shops/shops.module';
import { AuthService, PaymentService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import { Crypto } from '@/server/utilities/Crypto';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationsModule } from 'src/modules/locations/locations.module';
import { OrdersController } from './controllers';
import { OrdersPublicController } from './controllers/orders-public.controller';
import { CodeService, OrdersService, ProductOrderService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Product,
      ProductOrder,
      Payment,
      LocationProduct,
      Location,
      Cancellation,
      Client
    ]),
    LocationsModule,
    BankAccountsModule,
    forwardRef(() => ProductsModule),
    forwardRef(() => ShopsModule),
  ],
  providers: [OrdersService, Utils, TokenService, ClientsService, AuthService, ClientsService, CodeService, ProductOrderService, PaymentService, Crypto],
  controllers: [OrdersController, OrdersPublicController],
})
export class OrdersModule { }