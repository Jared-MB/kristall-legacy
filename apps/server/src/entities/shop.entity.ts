import { Setting } from 'src/modules/settings/models';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Image, PublicPage, User } from '.';

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

  @OneToOne(() => PublicPage, undefined, {
    nullable: true,
  })
  @JoinColumn()
  publicPage: PublicPage

  @OneToOne(() => Setting, (setting) => setting.shop)
  @JoinColumn()
  settings: Setting
}
