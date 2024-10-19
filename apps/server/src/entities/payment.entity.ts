import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class Payment {
  @PrimaryColumn()
  _id: string;

  @Column({
    enum: ['cash', 'card', 'transfer', 'pending'],
  })
  paymentMethod: string;

  @Column()
  advance: number;

  @Column({
    nullable: true,
  })
  account: string;

  @Column()
  total: number;

  @Column({
    default: 0,
  })
  cost: number;

  @Column({
    default: new Date(),
  })
  date: Date;

  @Column()
  pendingPayment: number;

  @ManyToOne(() => Shop)
  shop: Shop;
}
