import { BadRequestException, Controller, Get, Patch, Post, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { Cookies } from '@/server/decorators';
import { ResponseInterceptor } from '@/server/interceptors';
import { BankAccountsService } from '@/server/modules/bank-accounts/services';
import { AuthService } from '@/server/services';
import { Setting } from '../models';
import { SettingsService } from '../services/settings.service';

@Controller('settings')
export class SettingsController {

    constructor(
        private readonly settingsService: SettingsService,
        private readonly bankAccountsService: BankAccountsService,
        private readonly authService: AuthService
    ) { }

    @UseInterceptors(new ResponseInterceptor())
    @Get('default-batches')
    async getDefaultBatches(
        @Cookies('session') session: string
    ) {

        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        return {
            defaultBatchEnabled: !!settings?.defaultBatchEnabled
        }

    }

    @UseInterceptors(new ResponseInterceptor())
    @Get('default-pos-access')
    async getDefaultPOSAccess(
        @Cookies('session') session: string
    ) {

        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        return {
            defaultPOSAccessEnabled: !!settings?.defaultPOSAccessEnabled
        }

    }

    @UseInterceptors(new ResponseInterceptor())
    @Get('experimental-features')
    async getExperimentalFeatures(
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        return {
            useExperimentalFeatures: !!settings?.useExperimentalFeatures
        }
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('bank-accounts')
    async getBankAccountsSettings(
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        return {
            enableBankAccounts: !!settings?.enableBankAccounts
        }
    }

    @UseInterceptors(ResponseInterceptor)
    @Get('remove-bank-accounts')
    async getRemoveBankAccountsSettings(
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        return {
            removeBankAccounts: !!settings?.removeBankAccounts
        }
    }

    @UseInterceptors(new ResponseInterceptor())
    @Patch('experimental-features')
    async toggleExperimentalFeatures(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        const newSettings: Partial<Setting> = {
            useExperimentalFeatures: !settings?.useExperimentalFeatures
        }

        await this.settingsService.update(newSettings, shop._id)
        return newSettings
    }

    @UseInterceptors(ResponseInterceptor)
    @Patch('bank-accounts')
    async toggleBankAccounts(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)

        if (settings?.removeBankAccounts) {
            await this.bankAccountsService.removeBankAccounts(shop._id)
        }

        const newSettings: Partial<Setting> = {
            enableBankAccounts: !settings?.enableBankAccounts
        }

        await this.settingsService.update(newSettings, shop._id)
        return newSettings
    }

    @UseInterceptors(ResponseInterceptor)
    @Patch('remove-bank-accounts')
    async toggleRemoveBankAccounts(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        const newSettings: Partial<Setting> = {
            removeBankAccounts: !settings?.removeBankAccounts
        }

        await this.settingsService.update(newSettings, shop._id)
        return newSettings
    }

    @UseInterceptors(new ResponseInterceptor())
    @Post('toggle-default-batches')
    async toggleDefaultBatch(
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const { shop } = user

        try {
            const settings = await this.settingsService.findByShopId(shop._id)
            const newSettings: Partial<Setting> = {
                defaultBatchEnabled: !settings?.defaultBatchEnabled
            }

            await this.settingsService.update(newSettings, shop._id)
            return newSettings
        }
        catch {
            throw new BadRequestException()
        }
    }

    @UseInterceptors(new ResponseInterceptor())
    @Post('toggle-default-pos-access')
    async toggleDefaultPOSAccess(
        @Cookies('session') session: string
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const { shop } = user

        const settings = await this.settingsService.findByShopId(shop._id)
        const newSettings: Partial<Setting> = {
            defaultPOSAccessEnabled: !settings?.defaultPOSAccessEnabled
        }

        await this.settingsService.update(newSettings, shop._id)
        return newSettings
    }

}
