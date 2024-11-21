import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveryLocation, Location } from '@/server/entities';
import { TokenService, Utils } from '@/server/utilities';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([Location, DeliveryLocation])],
  controllers: [LocationsController],
  providers: [LocationsService, Utils, JwtService, TokenService],
  exports: [LocationsService],
})
export class LocationsModule { }
