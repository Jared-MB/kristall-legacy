import { User } from '@kristall/server/src/entities';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utils } from '@kristall/server/src/utilities';
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
