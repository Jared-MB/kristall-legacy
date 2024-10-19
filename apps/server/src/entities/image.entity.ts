import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Image {
  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  _id: string;
}
