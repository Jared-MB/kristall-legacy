import type { ProductOrder } from "src/entities";
import type { PaymentMethod } from "src/services/payment/interfaces";

export class CreateNoteClientDto {
    products: ProductOrder[]
    paymentMethod: PaymentMethod
}