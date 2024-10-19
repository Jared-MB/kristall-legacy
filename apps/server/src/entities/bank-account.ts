import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class BankAccount {
  @PrimaryColumn()
  _id: string;

  @Column()
  bank: string;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({
    nullable: true,
  })
  accountNumber?: string;

  @Column()
  lastFourDigits: number;

  @Column({
    default: 'v1.0.0',
  })
  _v: string;

  @Column()
  clabe: string;

  @Column()
  owner: string;
}
