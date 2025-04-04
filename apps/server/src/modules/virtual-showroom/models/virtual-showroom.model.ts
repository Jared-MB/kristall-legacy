import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { VirtualShowroomConfig } from "./virtual-showroom-config.model";

@Entity()
export class VirtualShowroom {
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

    @OneToOne(() => VirtualShowroomConfig, (virtualShowroomConfig) => virtualShowroomConfig.virtualShowroom, {
        nullable: true
    })
    @JoinColumn()
    virtualShowroomConfig: VirtualShowroomConfig
}

export type VS = VirtualShowroom