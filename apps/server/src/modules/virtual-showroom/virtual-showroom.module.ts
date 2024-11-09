import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicPage, Shop } from '@kristall/server/src/entities';
import { AuthService } from '@kristall/server/src/services';
import { ShopsModule } from '../shops/shops.module';
import { VirtualShowroomController } from './controllers/virtual-showroom.controller';
import { VirtualShowroomService } from './services/virtual-showroom.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PublicPage, Shop]),
        ShopsModule
    ],
    controllers: [VirtualShowroomController],
    providers: [VirtualShowroomService, AuthService],
    exports: [VirtualShowroomService]
})
export class VirtualShowroomModule { }
