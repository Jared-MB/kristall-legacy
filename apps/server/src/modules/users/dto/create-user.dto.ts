import type { Shop } from "@/server/entities";

export class CreateUserClientDto {
    email: string;
    name: string;
    password: string;
    username: string;
}

export class CreateUserServerDto {
    _id: string;
    email: string;
    name: string;
    password: string;
    username: string;
    role: 'admin' | 'user';
    permissions: string
    shop: Shop
    package: 'basic' | 'standard' | 'plus';
    stripeId: string;
}