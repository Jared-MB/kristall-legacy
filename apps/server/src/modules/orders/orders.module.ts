import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsService } from '@kristall/server/src/clients/clients.service';
import {
  Cancellation,
  Client,
  Location,
  LocationProduct,
  Order,
  Payment,
  Product,
  ProductOrder
} from '@kristall/server/src/entities';
import { LocationsModule } from '@kristall/server/src/locations/locations.module';
import { BankAccountsModule, ProductsModule } from '@kristall/server/src/modules';
import { AuthService, PaymentService } from '@kristall/server/src/services';
import { TokenService, Utils } from '@kristall/server/src/utilities';
import { Crypto } from '@kristall/server/src/utilities/Crypto';
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
  ],
  providers: [OrdersService, Utils, TokenService, ClientsService, AuthService, ClientsService, CodeService, ProductOrderService, PaymentService, Crypto],
  controllers: [OrdersController, OrdersPublicController],
})
export class OrdersModule { }