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
import { Cancellation, Client, Location, Payment, ProductOrder, Shop } from '.';

@Entity()
export class Order {
  @PrimaryColumn()
  _id: string;

  @ManyToOne(() => Client)
  client: Client;

  @ManyToOne(() => Location)
  location: Location;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({
    default: new Date(),
  })
  date: Date;

  @Column()
  code: string;

  @Column({
    enum: ['received', 'preparing', 'delivering', 'ready', 'completed', 'cancelled'],
    default: 'received',
  })
  status: "received"
    | "preparing"
    | "delivering"
    | "ready"
    | "completed"
    | "cancelled";

  @Column({
    default: null,
    nullable: true,
  })
  secret: string;

  @OneToOne(() => Cancellation, {
    nullable: true,
  })
  @JoinColumn()
  cancellation: Cancellation;

  @ManyToMany(() => ProductOrder)
  @JoinTable()
  products: ProductOrder[];

  @OneToOne(() => Payment)
  @JoinColumn()
  payment: Payment;
}
