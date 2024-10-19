import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Cancellation {
    @PrimaryColumn()
    _id: string;

    @Column()
    entityId: string;

    @Column({
        default: false,
    })
    isCancelled: boolean;

    @Column()
    reason: string;

    @Column({
        default: new Date(),
    })
    date: Date;

    @ManyToOne(() => User)
    by: User
}