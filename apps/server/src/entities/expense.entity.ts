import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { Cancellation } from './cancellation.entity';
import { Shop } from './shop.entity';
import { User } from './user.entity';

@Entity()
export class Expense {
  @PrimaryColumn()
  _id: string;

  @Column()
  concept: string;

  @Column()
  amount: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({
    default: new Date(),
  })
  date: Date;

  @OneToOne(() => Cancellation, {
    nullable: true,
  })
  @JoinColumn()
  cancellation: Cancellation;
}
