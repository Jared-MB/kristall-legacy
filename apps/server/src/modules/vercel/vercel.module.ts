import { Module } from '@nestjs/common';
import { ReportsModule } from '../reports/reports.module';
import { VercelService } from './services/vercel.service';

@Module({
    imports: [ReportsModule],
    providers: [VercelService],
    exports: [VercelService],
})
export class VercelModule {}
