import { HttpException } from "@nestjs/common";

export class PaymentRequiredException extends HttpException {
    constructor(message = 'Payment Required') {
        super(message, 402);
    }
}