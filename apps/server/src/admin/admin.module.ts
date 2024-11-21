import { User } from '@/server/entities';
import { Utils } from '@/server/utilities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AdminController],
  providers: [AdminService, Utils],
})
export class AdminModule { }
