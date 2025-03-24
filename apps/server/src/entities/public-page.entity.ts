import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * @deprecated Use the **VirtualShowroom** entity instead
 */
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
}