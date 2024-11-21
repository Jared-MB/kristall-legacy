import type { ProductOrder } from "@/server/entities";
import type { PaymentMethod } from "@/server/services/payment/interfaces";

export class CreateNoteClientDto {
    products: ProductOrder[]
    paymentMethod: PaymentMethod
}