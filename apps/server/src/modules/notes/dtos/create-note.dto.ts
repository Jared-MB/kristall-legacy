import type { ProductOrder } from "@kristall/server/src/entities";
import type { PaymentMethod } from "@kristall/server/src/services/payment/interfaces";

export class CreateNoteClientDto {
    products: ProductOrder[]
    paymentMethod: PaymentMethod
}