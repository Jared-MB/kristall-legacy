import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Image } from "./image.entity";

@Entity()
export class PublicPage {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({
        default: false
    })
    isPublic: boolean;

    @Column({
        unique: true
    })
    url: string;

    @OneToOne(() => Image, undefined, {
        nullable: true
    })
    @JoinColumn()
    bannerImage: Image

    @Column({
        length: 128,
        nullable: true
    })
    title: string;
}