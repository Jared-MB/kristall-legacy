import { PublicPage, Shop } from '@/server/entities';
import { AuthService } from '@/server/services';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CloudflareModule } from '../cloudflare/cloudflare.module';
import { ReportsModule } from '../reports/reports.module';
import { ShopsModule } from '../shops/shops.module';
import { VercelModule } from '../vercel/vercel.module';
import { VirtualShowroomController } from './controllers/virtual-showroom.controller';
import { VirtualShowroomService } from './services/virtual-showroom.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([PublicPage, Shop]),
        ShopsModule,
        CloudflareModule,
        VercelModule,
        ReportsModule
    ],
    controllers: [VirtualShowroomController],
    providers: [VirtualShowroomService, AuthService],
    exports: [VirtualShowroomService]
})
export class VirtualShowroomModule { }
