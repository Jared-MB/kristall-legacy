import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column()
  name: string;

  @ManyToOne(() => Shop)
  shop: Shop;

  @Column({
    type: 'int',
    default: 0,
  })
  purchases: number;
}
