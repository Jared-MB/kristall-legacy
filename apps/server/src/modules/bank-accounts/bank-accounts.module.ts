import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankAccount } from '@kristall/server/src/entities/bank-account';
import { AuthService } from '@kristall/server/src/services';
import { TokenService, Utils } from '@kristall/server/src/utilities';
import { Crypto } from '@kristall/server/src/utilities/Crypto';
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
