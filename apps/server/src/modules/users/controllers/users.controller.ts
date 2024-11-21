import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    ForbiddenException,
    Get,
    Headers,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    Query,
    Res,
    UseInterceptors
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { randomUUID } from 'node:crypto';
import { Cookies } from '@/server/decorators';
import { ResponseInterceptor } from '@/server/interceptors';
import { AuthService, UtilsService } from '@/server/services';
import { RESTRICTIONS, TokenService, USER_PERMISSIONS, Utils } from '@/server/utilities';
import { allowedQueries } from '../constants';
import { ChangePasswordDto, CreateUserClientDto } from '../dto';
import type { FindAllUsersOptions, FindAllUsersQuery } from '../interfaces';
import { UsersService } from '../services';

interface Param {
    id: string;
}

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly tokenService: TokenService,
        private readonly utils: Utils,
        private readonly authService: AuthService,
        private readonly utilsService: UtilsService
    ) { }

    @UseInterceptors(new ResponseInterceptor())
    @Get()
    async getUsers(@Cookies('session') session: string, @Query() query: FindAllUsersQuery) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new NotFoundException()
        }

        const parsedQuery = this.utilsService.parseQuery<FindAllUsersOptions>(query, allowedQueries)

        const users = await this.usersService.findAllUsers(user.shop._id, parsedQuery);
        return users
    }

    @UseInterceptors(new ResponseInterceptor())
    @Post()
    async createUser(
        @Cookies('session') session: string,
        @Body() body: CreateUserClientDto,
    ) {
        const user = this.authService.decodeCookie(session)
        if (!user) {
            throw new ForbiddenException()
        }

        if (user.role !== 'admin' || (user.permissions !== 'all' && !user.permissions.includes(USER_PERMISSIONS.USERS.CREATE))) {
            throw new ForbiddenException()
        }

        const users = await this.usersService.count(user.shop._id)

        if (users >= RESTRICTIONS.MAX_USERS[user.package as keyof typeof RESTRICTIONS.MAX_USERS]) {
            throw new BadRequestException('Número máximo de usuarios alcanzado')
        }

        const _id = randomUUID();
        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(body.password, saltOrRounds);

        const stripeId = user.stripeId + '_user';

        const { email, name, username } = body

        const newUser = this.usersService.create({
            _id,
            email,
            name,
            username,
            password: passwordHashed,
            role: 'user',
            shop: user.shop,
            permissions: 'none',
            package: user.package,
            stripeId
        })

        try {
            const { _id: newUserId } = await this.usersService.save(newUser)

            return {
                _id: newUserId,
            }
        }
        catch (error) {
            throw new InternalServerErrorException()
        }
    }

    @Get(':id')
    async getUser(@Res() res: Response, @Param() param: Param) {
        const user = this.usersService.findUserById({ _id: param.id });
        return await this.utils.adaptResponse(user, res);
    }

    @Put(':id')
    async updateUser(
        @Res() res: Response,
        @Param() param: Param,
        @Body() body: any,
    ) {
        const user = this.usersService.updateUser(param.id, body);
        return await this.utils.adaptResponse(user, res);
    }

    @Delete(':id')
    async deleteUser(
        @Param('id') param: string,
        @Headers('authorization') auth: string,
        @Res() res: Response,
    ) {
        const deleteUser = this.usersService.deleteUser(param, auth);
        return this.utils.adaptResponse(deleteUser, res);
    }

    @Get('shop/:id')
    async getUsersByShopId(@Res() res: Response, @Param() param: Param) {
        const users = this.usersService.findUsersByShopId(param.id);
        return await this.utils.adaptResponse(users, res);
    }

    @Put(':id/change/username')
    async changeUsername(
        @Param() param: Param,
        @Body() body: { username: string },
        @Res() res: Response,
    ) {
        const user = this.usersService.changeUsername(param.id, body.username);
        return await this.utils.adaptResponse(user, res, {
            message: 'Username changed successfully',
        });
    }

    @Put('change/password')
    async changePassword(
        @Body() payload: ChangePasswordDto,
        @Cookies('session') session: string,
    ) {
        const user = this.authService.decodeCookie(session);
        if (!user) {
            throw new ForbiddenException()
        }

        const exists = this.usersService.exist(user._id)
        if (!exists) {
            throw new ForbiddenException()
        }

        const { newPassword, password } = payload

        try {
            await this.usersService.changePassword(password, newPassword, user._id)
        }
        catch (error) {
            console.log(error)
            throw new InternalServerErrorException()
        }
    }
}
