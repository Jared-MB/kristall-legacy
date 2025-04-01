import { Setting } from '@/server/modules/settings/models';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Image, PublicPage, User } from '.';
import { VirtualShowroom } from '../modules/virtual-showroom/models/virtual-showroom.model';

@Entity()
export class Shop {
  @PrimaryColumn()
  _id: string;

  @Column({
    unique: true,
  })
  name: string;

  @OneToMany(() => User, (user) => user.shop, {
    nullable: true,
  })
  users: User[];

  @OneToOne(() => Image, undefined, {
    nullable: true,
  })
  @JoinColumn()
  image: Image;

  /**
   * @deprecated Use the **VirtualShowroom** entity instead
   */
  @OneToOne(() => PublicPage, undefined, {
    nullable: true,
  })
  @JoinColumn()
  publicPage: PublicPage

  @OneToOne(() => VirtualShowroom, undefined, {
    nullable: true,
  })
  @JoinColumn()
  virtualShowroom: VirtualShowroom

  @OneToOne(() => Setting, (setting) => setting.shop)
  @JoinColumn()
  settings: Setting
}
