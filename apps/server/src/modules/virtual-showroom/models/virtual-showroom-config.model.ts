import { Image } from "src/entities";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VirtualShowroom, type VS } from "./virtual-showroom.model";

@Entity()
export class VirtualShowroomConfig {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @OneToOne(() => Image, undefined, {
        nullable: true
    })
    @JoinColumn()
    cardImageOne: Image

    @OneToOne(() => Image, undefined, {
        nullable: true
    })
    @JoinColumn()
    cardImageTwo: Image

    @OneToOne(() => Image, undefined, {
        nullable: true
    })
    @JoinColumn()
    cardImageThree: Image

    @OneToOne(() => Image, undefined, {
        nullable: true,
    })
    @JoinColumn()
    cardImageFour: Image

    @Column({
        length: 128,
        nullable: true
    })
    cardTitle: string;

    @Column({
        length: 128,
        nullable: true
    })
    cardDescription: string;

    @OneToOne(() => VirtualShowroom, (virtualShowroom) => virtualShowroom.virtualShowroomConfig)
    virtualShowroom: VS;
}