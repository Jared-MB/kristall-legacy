import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicPage, Shop } from '@/server/entities';
import { AuthService } from '@/server/services';
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
