import { Shop } from "@/server/entities";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Setting {
    @PrimaryGeneratedColumn('uuid')
    _id: string

    @OneToOne(() => Shop, (shop) => shop.settings)
    @JoinColumn()
    shop: Shop

    @Column({
        default: false
    })
    defaultBatchEnabled: boolean

    @Column({
        default: false
    })
    defaultPOSAccessEnabled: boolean

    @Column({
        default: false
    })
    enableBankAccounts: boolean

    @Column({
        default: true
    })
    removeBankAccounts: boolean

    @Column({
        default: false
    })
    useExperimentalFeatures: boolean

}