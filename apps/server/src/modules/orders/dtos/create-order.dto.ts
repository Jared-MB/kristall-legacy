import { PaymentMethod } from "@/server/services/payment/interfaces";

export class CreateOrderDto {
    client: string;
    location: string;
    cart: Cart[];
    paymentMethod: PaymentMethodDto;
    advance?: number;
    productsFrom: string;
    cost?: number;
}

export class Cart {
    productId: string;
    quantity: number;
    price: number;
    total: number;
    code: string;
    name: string;
    cost: number;
}

export class PaymentMethodDto {
    type: PaymentMethod;
    account?: string;
}


