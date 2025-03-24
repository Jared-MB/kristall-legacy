import { Image } from "src/entities";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class VirtualShowroomConfig {

    @PrimaryColumn('uuid')
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
}