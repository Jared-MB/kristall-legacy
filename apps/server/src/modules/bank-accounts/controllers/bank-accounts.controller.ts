import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Headers,
    InternalServerErrorException,
    Param,
    Post,
    Res,
    UnauthorizedException,
    UseInterceptors
} from '@nestjs/common';
import type { Response } from 'express';
import { Cookies } from '@/server/decorators';
import { ResponseInterceptor } from '@/server/interceptors';
import { SettingsService } from '@/server/modules/settings/services';
import { AuthService } from '@/server/services';
import { TokenService, Utils } from '@/server/utilities';
import type { CreateBankAccount } from '../interfaces';
import { BankAccountsService } from '../services/bank-accounts.service';

@Controller('bank-accounts')
export class BankAccountsController {
    constructor(
        private readonly bankAccountsService: BankAccountsService,
        private readonly settingsService: SettingsService,
        private readonly tokenService: TokenService,
        private readonly utils: Utils,
        private readonly auth: AuthService,
    ) { }

    @UseInterceptors(ResponseInterceptor)
    @Post()
    async createBankAccount(
        @Body() body: CreateBankAccount,
        @Cookies('session') session: string,
    ) {
        const user = this.auth.decodeCookie(session);
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException();
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        if (!settings || !settings.enableBankAccounts) {
            throw new BadRequestException()
        }

        const { bank, accountNumber, password, clabe, owner } = body;

        const response = await this.bankAccountsService.createBankAccount(
            bank,
            clabe,
            owner,
            shop,
            accountNumber,
            password,
        );

        if (!response) {
            throw new InternalServerErrorException()
        }

        return 'ok';
    }

    @Delete(':id')
    async deleteBankAccount(
        @Res() res: Response,
        @Param('id') id: string,
        @Headers('authorization') token: string,
    ) {
        const shop = this.tokenService.getShop(token);
        if (!shop) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const bankAccount = await this.bankAccountsService.getBankAccount(id);
        if (!bankAccount) {
            return res.status(404).json({ message: 'No route found' });
        }

        if (bankAccount.shop._id !== shop._id) {
            return res.status(404).json({ message: 'No route found' });
        }

        const response = this.bankAccountsService.deleteBankAccount(id);
        return this.utils.adaptResponse(response, res);
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('/safe')
    async getSafeBankAccounts(
        @Cookies('session') session: string,
    ) {
        const user = this.auth.decodeCookie(session);
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException();
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        if (!settings || !settings.enableBankAccounts) {
            throw new BadRequestException()
        }

        return await this.bankAccountsService.getSafeBankAccounts(shop._id);
    }

    @Post('/full')
    async getBankAccounts(
        @Headers('authorization') token: string,
        @Res() res: Response,
        @Body() body: { password: string | undefined },
    ) {
        const shop = this.tokenService.getShop(token);
        if (!shop) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const id = shop._id;
        const password = body.password;
        const response = this.bankAccountsService.getBankAccounts(id, password);
        return this.utils.adaptResponse(response, res, {
            onErrorMessage: 'Invalid password',
            status: 401,
        });
    }
}
