import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from 'src/entities/bank-account';
import { AuthService } from 'src/services';
import { TokenService, Utils } from 'src/utilities';
import { Crypto } from 'src/utilities/Crypto';
import { SettingsModule } from '../settings/settings.module';
import { BankAccountsController } from './controllers/bank-accounts.controller';
import { BankAccountsService } from './services/bank-accounts.service';

@Module({
  imports: [TypeOrmModule.forFeature([BankAccount]), SettingsModule],
  providers: [BankAccountsService, Crypto, TokenService, Utils, AuthService],
  controllers: [BankAccountsController],
  exports: [BankAccountsService]
})
export class BankAccountsModule { }
