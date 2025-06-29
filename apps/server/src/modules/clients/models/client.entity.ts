import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Shop } from '../../../entities/shop.entity';

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

  @Column({
    default: 1,
    enum: [0, 1],
    nullable: true
  })
  isActive: number
}
