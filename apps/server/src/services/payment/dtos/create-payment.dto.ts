import { Shop } from "@/server/entities"
import { PaymentMethod } from "../interfaces"

export class CreatePaymentDto {
    _id: string
    account?: string
    advance: number
    paymentMethod: PaymentMethod
    total: number
    cost: number
    date: Date
    shop: Shop
}