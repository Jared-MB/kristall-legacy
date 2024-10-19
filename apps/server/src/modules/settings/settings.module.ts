import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/services';
import { BankAccountsModule } from '../bank-accounts/bank-accounts.module';
import { SettingsController } from './controllers';
import { Setting } from './models';
import { SettingsService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([Setting]),
    forwardRef(() => BankAccountsModule),
  ],
  controllers: [SettingsController],
  providers: [SettingsService, AuthService],
  exports: [SettingsService]
})
export class SettingsModule { }
