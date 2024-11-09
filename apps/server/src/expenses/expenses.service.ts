import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Cancellation, SaveUser } from '@kristall/server/src/entities';
import { Expense } from '@kristall/server/src/entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expensesRepository: Repository<Expense>,
    @InjectRepository(Cancellation)
    private readonly cancellationRepository: Repository<Cancellation>
  ) { }

  async getAllExpensesByShopId(shopID: string) {
    const expenses = await this.expensesRepository.find({
      where: { shop: { _id: shopID } },
      relations: {
        cancellation: {
          by: true
        },
        user: true,
        shop: true
      },
      order: { date: 'DESC' }
    });
    const saveExpenses = expenses.map(expense => {
      const { _id, name, username } = expense.user
      return {
        ...expense,
        user: { _id, name, username }
      }
    })
    return saveExpenses;
  }

  async createExpense(body: Expense, user: SaveUser) {
    const _id = randomUUID();
    const expense = this.expensesRepository.create({
      ...body,
      _id,
      user: user,
      shop: user.shop,
    });
    return await this.expensesRepository.save(expense);
  }

  async cancelExpense(cancellation: Omit<Cancellation, 'date' | '_id'>, shopId: string) {
    const expense = await this.expensesRepository.findOne({
      where: { _id: cancellation.entityId, shop: { _id: shopId } },
      relations: ['user', 'shop', 'cancellation']
    });
    if (!expense) {
      return false;
    }
    const cancellationId = randomUUID();
    const newCancellation = this.cancellationRepository.create({
      ...cancellation,
      _id: cancellationId,
      date: new Date()
    });
    await this.cancellationRepository.save(newCancellation);
    expense.cancellation = newCancellation
    await this.expensesRepository.save(expense);
    const { _id, name, username } = expense.user
    return {
      ...expense,
      user: { _id, name, username }
    }
  }
}
