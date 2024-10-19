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
import { Cancellation, Location, Payment, ProductOrder, Shop } from '.';

@Entity()
export class Note {
  @PrimaryColumn()
  _id: string;

  @Column({
    default: new Date(),
  })
  date: Date;

  @ManyToMany(() => ProductOrder)
  @JoinTable()
  products: ProductOrder[];

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;

  @ManyToOne(() => Shop)
  shop: Shop;

  @ManyToOne(() => Location)
  location: Location;

  @Column()
  code: string;

  @OneToOne(() => Cancellation, {
    nullable: true,
  })
  @JoinColumn()
  cancellation: Cancellation;
}
