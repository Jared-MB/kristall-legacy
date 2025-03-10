import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';

import { User } from '@/server/entities';
import { firebaseRegister } from '@/server/firebase';
import { ShopService } from '@/server/modules/shops/services';
import { RESTRICTIONS, USER_PERMISSIONS } from '@/server/utilities';
import { ServerError } from '@/server/utilities/Errors';
import { JwtService } from '@nestjs/jwt';
import { CreateUserServerDto } from '../dto';
import { FindAllUsersOptions } from '../interfaces/users.interface';

interface FindUser {
    showPassword?: boolean;
}

interface FindUserById extends FindUser {
    _id: string;
}

interface FindUserByUsername extends FindUser {
    username: string;
}

export type FindUserResult =
    | User
    | (Omit<User, 'password'> & {
        password?: string;
    });

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService,
        private shopService: ShopService,
    ) { }

    async findAllUsers(shopId: string, options?: FindAllUsersOptions) {

        if (options) {
            return await this.usersRepository.find({
                where: { shop: { _id: shopId } },
                select: {
                    _id: true,
                    ...options
                }
            })
        }

        const users = await this.usersRepository.find({
            where: { shop: { _id: shopId } },
            select: {
                _id: true,
                username: true,
                name: true,
                email: true,
                role: true,
                permissions: true,
            }
        });
        return users;
    }

    async findUsersByShopId(shopId: string) {
        const users = await this.usersRepository.find({
            where: { shop: { _id: shopId } },
            relations: {
                shop: {
                    image: true,
                    publicPage: true,
                }
            }
        });
        const usersWithoutPassword = users.map((user) => {
            const { password, stripeId, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return usersWithoutPassword;
    }

    async count(shopId: string) {
        return await this.usersRepository.count({
            where: { shop: { _id: shopId } },
        });
    }

    async comparePassword(userId: string, password: string){
        const user = await this.findUserById({ _id: userId, showPassword: true });
        if (!user || !user.password) {
            return false
        }

        return await bcrypt.compare(password, user.password);
    }

    /**
     * @deprecated
     */
    async deleteUser(userId: string, auth: string) {
        const token = auth.split(' ')[1];
        const payloadToken = this.jwtService.decode(token) as User;
        if (!payloadToken || typeof payloadToken === 'string') {
            throw new ServerError('Invalid or missing token', 401);
        }
        if (
            payloadToken.role !== 'admin' &&
            (payloadToken.permissions !== 'all' ||
                !payloadToken.permissions.includes('users:delete-user'))
        ) {
            console.log('wa1');
            throw new ServerError('Forbidden', 403);
        }

        const userToDelete = await this.findUserById({ _id: userId });
        if (!userToDelete) {
            throw new ServerError('User not found', 404);
        }

        if (payloadToken.shop._id !== userToDelete.shop._id) {
            console.log('wa2');
            throw new ServerError('Forbidden', 403);
        }

        if (userToDelete.role === 'admin') {
            console.log('wa3');
            throw new ServerError('Forbidden', 403);
        }

        const userDeleted = await this.usersRepository.delete({ _id: userId });
        return {
            isDeleted: userDeleted.affected === 1,
        };
    }

    /**
     * @deprecated Change to a Stripe Module
     */
    async createTemporalStripePassword(name: string, userPackage: string) {
        let password = '';
        name.split(' ').forEach((word) => {
            password += word.substring(0, 2).toLowerCase();
        });
        password += `_${userPackage.toLowerCase()}`;
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash;
    }

    async findUserById({
        _id,
        showPassword = false,
    }: FindUserById): Promise<FindUserResult | null> {
        if (!_id) {
            throw new Error('User not found');
        }
        const user = await this.usersRepository.findOne({
            where: { _id },
            relations: {
                shop: {
                    image: true,
                    publicPage: true,
                }
            },
        });
        if (!user) {
            throw new Error('User not found');
        }

        const stripeUser = {
            ...user
        };
        if (showPassword) {
            return stripeUser;
        }
        const { password, ...result } = stripeUser;
        return result;
    }

    /**
     * @deprecated Change to a Stripe Module
     */
    async createStripeAdminUser(user: Pick<User, 'name' | 'email' | 'stripeId'>) {
        const _id = randomUUID();
        const newUser = this.usersRepository.create({
            ...user,
            _id,
            role: 'admin',
        });
        const userSaved = await this.usersRepository.save(newUser);
        return userSaved;
    }

    /**
     * @deprecated
     */
    async createUser(
        user: Pick<User, 'email' | 'name' | 'password' | 'username'>,
        auth: string,
    ) {
        const token = auth.split(' ')[1];
        const payloadToken = this.jwtService.decode(token) as User;
        if (!payloadToken || typeof payloadToken === 'string') {
            throw new ServerError('Invalid or missing token', 401);
        }

        if (
            payloadToken.permissions !== 'all' &&
            payloadToken.role !== 'admin' &&
            !payloadToken.permissions.includes(USER_PERMISSIONS.USERS.CREATE)
        ) {
            throw new ServerError('Invalid or missing token', 401);
        }

        const totalUsers = await this.usersRepository.count({
            where: { shop: { _id: payloadToken.shop._id } },
        });

        if (
            totalUsers >=
            RESTRICTIONS.MAX_USERS[
            payloadToken.package as keyof typeof RESTRICTIONS.MAX_USERS
            ]
        ) {
            throw new ServerError('Max users reached', 403);
        }

        const _id = randomUUID();

        const saltOrRounds = 10;
        const passwordHashed = await bcrypt.hash(user.password, saltOrRounds);

        const stripeId = payloadToken.stripeId + '_user';

        const newUser = {
            ...user,
            _id,
            password: passwordHashed,
            role: 'user',
            shop: payloadToken.shop,
            permissions: 'none',
            package: payloadToken.package,
            stripeId
        };

        await firebaseRegister(user.email, stripeId);

        const userCreated = this.usersRepository.create(newUser);
        const userSaved = await this.usersRepository.save(userCreated);
        const { password, ...rest } = userSaved;
        return rest;
    }

    async changeUsername(_id: string, newUsername: string) {
        await this.usersRepository.update({ _id }, { username: newUsername });
        const user = await this.findUserById({ _id });
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }

    exist(_id: string) {
        return this.usersRepository.exists({
            where: {
                _id
            }
        })
    }

    private async getUserPassword(_id: string) {
        const user = await this.usersRepository.findOne({
            where: {
                _id
            },
            select: {
                password: true
            }
        })
        return user?.password ?? null
    }

    async findUserByUsername({
        username,
        showPassword,
    }: FindUserByUsername): Promise<FindUserResult | null> {
        const user = await this.usersRepository.findOne({
            where: { username },
            relations: {
                shop: {
                    image: true,
                    publicPage: true,
                },
            },
        });
        if (!user) {
            throw new Error('User not found');
        }
        if (showPassword) {
            return user;
        }
        const { password, ...result } = user;
        return result;
    }

    async changePassword(
        password: string,
        newPassword: string,
        _id: string
    ) {
        const userPassword = await this.getUserPassword(_id);
        if (!userPassword) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, userPassword);
        if (!isMatch) {
            throw new Error('Invalid password');
        }

        const hash = await bcrypt.hash(newPassword, 10);
        await this.usersRepository.save({
            _id,
            password: hash
        })
    }


    async updateUser(userId: string, user: Partial<User>) {
        await this.usersRepository.update({ _id: userId }, user);
        return await this.findUserById({ _id: userId });
    }

    create(user: CreateUserServerDto): User {
        return this.usersRepository.create(user);
    }

    async save(user: User): Promise<User> {
        return await this.usersRepository.save(user);
    }

    /**
     * @deprecated Too much logic in this service
     */
    async updateUserByEmail(email: string, user: Partial<User>) {
        const userdb = await this.usersRepository.findOne({ where: { email } });
        if (!userdb) {
            throw new NotFoundException()
        }

        const hash = await bcrypt.hash(user.password as string, 10);

        const userFound = await this.findUserById({ _id: userdb._id });
        if (userFound?.shop?.name) {
            throw new BadRequestException('El nombre no esta disponible')
        }
        const shop = await this.shopService.createShop({
            name: (user as any).shopName.trim() as unknown as string,
            users: [userdb]
        });
        const newUser: User = {
            ...userdb,
            username: user.username as string,
            password: hash,
            shop,
        };
        await this.updateUser(userdb._id, newUser);
        const userSaved = await this.findUserById({ _id: userdb._id });
        return userSaved;
    }
}
