import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '@kristall/server/src/entities';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dtos';

@Injectable()
export class PaymentService {

    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>
    ) { }

    create(payment: CreatePaymentDto): Payment {
        return this.paymentRepository.create({
            ...payment,
            pendingPayment: payment.total - payment.advance
        })
    }

    async save(payment: Payment): Promise<Payment> {
        return await this.paymentRepository.save(payment)
    }

    async remove(id: string) {
        return await this.paymentRepository.delete({
            _id: id
        })
    }

}
