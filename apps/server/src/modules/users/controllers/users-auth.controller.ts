import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Put,
    Query,
    Res,
    UnauthorizedException,
    UseInterceptors
} from '@nestjs/common';
import { Response } from 'express';
import { Cookies } from 'src/decorators';
import { Public } from 'src/decorators/public.decorator';
import { ResponseInterceptor } from 'src/interceptors';
import { AuthService } from 'src/services';
import { Utils } from 'src/utilities';
import { UsersService } from '../services';

@Controller()
export class UsersAuthController {
    constructor(
        private usersService: UsersService,
        private readonly authService: AuthService,
        private readonly utils: Utils,
    ) { }

    @UseInterceptors(new ResponseInterceptor())
    @Get('user/permissions')
    async getUserPermissionsDashboard(
        @Cookies('session') session: string,
        @Query('_id') _id: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        if (!_id) {
            throw new NotFoundException()
        }
        const userToCheck = await this.usersService.findUserById({ _id })
        if (!userToCheck) {
            throw new NotFoundException()
        }

        const { shop: shopToCheck } = userToCheck
        const { shop } = user

        if (shopToCheck._id !== shop._id) {
            throw new NotFoundException()
        }

        const { permissions } = userToCheck
        return permissions
    }

    @UseInterceptors(new ResponseInterceptor())
    @Get('user/permissions/own')
    async getOwnUserPermissions(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        return user.permissions
    }

    @UseInterceptors(new ResponseInterceptor())
    @Get('user/permissions/pos')
    async getUserPermissionsPOS(
        @Cookies('session') session: string,
        @Query('_id') _id: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        if (!_id) {
            throw new NotFoundException()
        }
        const userToCheck = await this.usersService.findUserById({ _id })
        if (!userToCheck) {
            throw new NotFoundException()
        }

        const { shop: shopToCheck } = userToCheck
        const { shop } = user

        if (shopToCheck._id !== shop._id) {
            throw new NotFoundException()
        }

        const { permissions } = userToCheck

        return permissions.includes('pos:access;')
    }

    @UseInterceptors(new ResponseInterceptor())
    @Put('user/permissions/pos')
    async toggleUserPermissionsPOS(
        @Cookies('session') session: string,
        @Query('_id') _id: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        if (!_id) {
            throw new NotFoundException()
        }
        const userToCheck = await this.usersService.findUserById({ _id })
        if (!userToCheck) {
            throw new NotFoundException()
        }

        const { shop: shopToCheck } = userToCheck
        const { shop } = user

        if (shopToCheck._id !== shop._id) {
            throw new NotFoundException()
        }

        const { permissions } = userToCheck

        const hasPOSAccess = permissions.includes('pos:access;')

        let newPermissions = permissions.endsWith(';') ? permissions : permissions + ';'

        if (!hasPOSAccess) {
            newPermissions += 'pos:access;'
        }
        else {
            newPermissions = newPermissions.replace('pos:access;', 'pos:deny;')
        }

        await this.usersService.updateUser(userToCheck._id, { permissions: newPermissions })
        return 'ok'
    }

    @UseInterceptors(new ResponseInterceptor())
    @Put('user/permissions')
    async updateUserPermissions(
        @Cookies('session') session: string,
        @Body() body: { permissions: string, _id: string },
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user || user.role !== 'admin') {
            throw new UnauthorizedException()
        }

        const userToUpdate = await this.usersService.findUserById({ _id: body._id })
        if (!userToUpdate) {
            throw new NotFoundException()
        }

        const { shop: shopToUpdate } = userToUpdate
        const { shop } = user

        if (shopToUpdate._id !== shop._id) {
            throw new NotFoundException()
        }

        const { permissions: currentPermissions } = userToUpdate
        const { permissions } = body

        if (permissions === 'all' || currentPermissions === 'all') {
            throw new BadRequestException()
        }

        if (permissions === 'dashboard:deny;' || permissions === 'dashboard:access;') {
            await this.usersService.updateUser(body._id, { permissions })
            return 'ok'
        }

        const hasDashboardAccess = currentPermissions.includes('dashboard:access;')

        if (!hasDashboardAccess) {
            throw new BadRequestException()
        }

        const newPermissions = 'dashboard:access;' + permissions


        await this.usersService.updateUser(body._id, { permissions: newPermissions })
        return 'ok'
    }


    @Public()
    @Put('register')
    async signup(
        @Res() res: Response,
        @Query() query: { by: 'stripe' },
        @Body() body: any,
    ) {
        if (query.by !== 'stripe') {
            throw new NotFoundException()
        }
        const user = this.usersService.updateUserByEmail(body.email, body);
        return await this.utils.adaptResponse(user, res);
    }
}