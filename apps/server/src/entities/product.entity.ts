import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Image, LocationProduct, Shop } from '.';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryColumn()
  _id: string;

  @Column()
  name: string;

  @Column({
    type: 'float',
  })
  price: number;

  @Column()
  stock: number;

  @ManyToOne(() => Shop)
  shop: Shop;

  @OneToOne(() => Image, undefined, {
    nullable: true,
  })
  @JoinColumn()
  image: Image;

  @Column()
  code: string;

  @ManyToMany(() => LocationProduct)
  @JoinTable()
  locations: LocationProduct[];

  @Column({
    type: 'float',
    default: 0,
  })
  cost: number;

  @Column({
    type: 'date',
    nullable: true,
    default: new Date(),
  })
  createdAt: Date;

  @Column({
    type: 'date',
    nullable: true,
    default: new Date(),
  })
  updatedAt: Date;

  @ManyToOne(() => Category, {
    nullable: true,
  })
  category: Category;

  @Column({
    default: 0,
  })
  totalSales: number;

  @Column({ default: 0, enum: [0, 1] })
  batchEnabled: number;
}

@Entity()
export class ProductOrder {
  @PrimaryColumn()
  _id: string;

  @Column()
  productId: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @Column()
  total: number;

  @Column()
  code: string;
}
