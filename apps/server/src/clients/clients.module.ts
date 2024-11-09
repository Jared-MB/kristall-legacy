import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client, Shop } from '@/server/entities';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Shop]),
  ],
  controllers: [ClientsController],
  providers: [ClientsService, Utils, TokenService, AuthService],
  exports: [ClientsService]
})
export class ClientsModule { }
