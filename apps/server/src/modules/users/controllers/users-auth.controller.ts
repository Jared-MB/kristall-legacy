import { Cookies } from '@/server/decorators';
import { Public } from '@/server/decorators/public.decorator';
import { ResponseInterceptor } from '@/server/interceptors';
import { AuthService } from '@/server/services';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Put,
    Query,
    Request,
    UnauthorizedException,
    UseInterceptors
} from '@nestjs/common';
import { AuthRequest } from 'src/interfaces/requests';
import { UsersService } from '../services';

@UseInterceptors(ResponseInterceptor)
@Controller()
export class UsersAuthController {
    constructor(
        private usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Get('user/is-admin')
    async getUserIsAdmin(
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new UnauthorizedException()
        }

        const ADMINS_USERNAMES = process.env.ADMINS_USERNAMES?.split(',').map(username => username.trim());
        const ADMINS_SHOPS_IDS = process.env.ADMINS_SHOP_IDS?.split(',').map(shopId => shopId.trim());

        if (!ADMINS_USERNAMES || !ADMINS_SHOPS_IDS) throw new UnauthorizedException()

        if (ADMINS_USERNAMES.includes(user.username) && ADMINS_SHOPS_IDS.includes(user.shop._id)) {
            return true
        }

        return false
    }

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

    @Get('user/permissions/own')
    async getOwnUserPermissions(
        @Request() req: AuthRequest
    ) {
        const { permissions } = req.user
        return permissions
    }

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
        @Query() query: { by: 'stripe' },
        @Body() body: any,
    ) {
        if (query.by !== 'stripe') {
            throw new NotFoundException()
        }
        const user = await this.usersService.updateUserByEmail(body.email, body);
        if (!user){
            throw new NotFoundException()
        }

        return 'ok'
    }
}