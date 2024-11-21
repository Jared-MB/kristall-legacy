import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Put,
  Req,
  Res
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Cancellation } from '@/server/entities';
import { Expense } from '@/server/entities/expense.entity';
import { TokenService, Utils } from '@/server/utilities';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService,
    private readonly tokenService: TokenService,
    private readonly utils: Utils,
  ) { }

  @Get()
  async getAllExpensesByShopId(
    @Res() res: Response,
    @Headers('authorization') auth: string,
  ) {
    const shopID = this.tokenService.getShop(auth)?._id;
    if (!shopID) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const expenses = this.expensesService.getAllExpensesByShopId(shopID);
    return this.utils.adaptResponse(expenses, res);
  }

  @Post()
  async createExpense(
    @Body() body: Expense,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const cookie = req.cookies['session']
    const payload = this.tokenService.decodeCookie(cookie)
    if (!payload) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const expense = this.expensesService.createExpense(body, payload);
    return this.utils.adaptResponse(expense, res);
  }

  @Put('cancel')
  async cancelExpense(
    @Body() body: Omit<Cancellation, 'date' | '_id'>,
    @Headers('authorization') auth: string,
    @Res() res: Response,
  ) {
    const shop = this.tokenService.getShop(auth);
    if (!shop) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const response = this.expensesService.cancelExpense(body, shop._id);
    return this.utils.adaptResponse(response, res);
  }
}
