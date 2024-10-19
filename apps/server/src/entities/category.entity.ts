import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Shop } from "./shop.entity";

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
}