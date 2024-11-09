import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancellation, Expense } from '@kristall/server/src/entities';
import { TokenService, Utils } from '@kristall/server/src/utilities';
import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Expense, Cancellation])],
  controllers: [ExpensesController],
  providers: [ExpensesService, TokenService, Utils],
})
export class ExpensesModule { }
