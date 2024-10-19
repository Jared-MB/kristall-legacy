import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client, Shop } from 'src/entities';
import { AuthService } from 'src/services';
import { TokenService, Utils } from 'src/utilities';
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
