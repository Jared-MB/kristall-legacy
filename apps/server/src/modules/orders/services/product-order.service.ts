import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOrder } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class ProductOrderService {

    constructor(@InjectRepository(ProductOrder)
    private readonly productOrderRepository: Repository<ProductOrder>) { }

    async save(product: ProductOrder) {
        return await this.productOrderRepository.save(product);
    }

    async remove(id: string) {
        return await this.productOrderRepository.delete({
            _id: id
        });
    }

}
