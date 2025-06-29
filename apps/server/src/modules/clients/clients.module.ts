import { Shop } from '@/server/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsController } from './controllers/clients.controller';
import { Client } from './models/client.entity';
import { ClientsRepository } from './repositories/clients.repository';
import { ClientsService } from './services/clients.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Shop]),
  ],
  controllers: [ClientsController],
  providers: [ClientsRepository, ClientsService],
  exports: [ClientsService]
})
export class ClientsModule { }
