import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LocationProduct } from './location.entity';

@Entity()
export class ProductBatch {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column()
    batchNumber: number;

    @Column()
    stock: number;

    @Column({ type: 'date' })
    expirationDate: Date;

    @ManyToOne(() => LocationProduct, locationProduct => locationProduct.productBatches)
    locationProduct: LocationProduct;
}
