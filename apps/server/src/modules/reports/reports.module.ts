import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/services';
import { ReportsController } from './controllers/reports.controller';
import { ErrorLog } from './models/report.model';
import { ReportsService } from './services/reports.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([ErrorLog])],
  controllers: [ReportsController],
  providers: [ReportsService, AuthService],
  exports: [ReportsService],
})
export class ReportsModule {}
