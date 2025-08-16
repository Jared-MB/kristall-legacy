import { Shop } from "src/entities/shop.entity";
import { Product } from "src/modules/products/models/product.model";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column()
    name: string;

    @ManyToOne(() => Shop)
    shop: Shop;

    @OneToMany(() => Product, product => product.category)
    products: Product[];

    @Column({
        default: 1,
        enum: [0, 1],
        nullable: true
    })
    isActive: number
}