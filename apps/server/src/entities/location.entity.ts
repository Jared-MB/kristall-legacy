import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import { ProductBatch } from './batch.entity';
import { Product } from './product.entity';
import { Shop } from './shop.entity';

@Entity()
export class Location {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  phone: number;
}

@Entity()
export class DeliveryLocation {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    default: 'Sin dirección'
  })
  address: string;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({
    type: 'bigint',
    nullable: true,
  })
  phone: number;

  @Column({
    nullable: true,
  })
  isLocal: boolean;
}

@Entity()
export class LocationProduct {
  @PrimaryColumn()
  _id: string;

  /**
   * @deprecated Use the relation with the `Product` entity instead.
   */
  @Column({
    nullable: true
  })
  productId: string;

  @ManyToOne(() => Product, {
    nullable: true
  })
  product: Product;

  @Column()
  locationId: string;

  @Column()
  stock: number;

  @OneToMany(() => ProductBatch, productBatch => productBatch.locationProduct)
  productBatches: ProductBatch[];
}
