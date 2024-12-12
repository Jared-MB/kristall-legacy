import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Shop } from './shop.entity';

export * from '@/server/modules/products/models/location-product.model';

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

