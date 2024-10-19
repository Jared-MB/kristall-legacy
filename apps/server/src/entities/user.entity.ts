import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Shop } from './shop.entity';

@Entity()
export class User {
  @PrimaryColumn()
  _id: string;

  @Column({
    unique: true,
    nullable: true,
  })
  username: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  password: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    enum: ['admin', 'user', 'SuperAdmin'],
  })
  role: string;

  @Column()
  permissions: string;

  @ManyToOne(() => Shop, (shop) => shop.users, {
    nullable: true,
  })
  shop: Shop;

  @Column({
    enum: ['basic', 'standard', 'plus'],
    nullable: true,
  })
  package: 'basic' | 'standard' | 'plus';

  @Column({
    nullable: true,
  })
  stripeId: string;

  @Column({
    default: new Date(),
  })
  createdAt: Date;

  /**
   * @deprecated 
   */
  @Column({
    nullable: true,
  })
  firebaseId: string;

  @Column({
    default: true,
  })
  isActive: boolean;
}

export type SaveUser = Omit<User, 'password' | 'createdAt'>;
