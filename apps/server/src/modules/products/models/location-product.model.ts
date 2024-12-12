import { ProductBatch } from "src/entities";
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Product } from "./product.model";

@Entity()
export class LocationProduct {
  @PrimaryColumn()
  _id: string;

  /**
   * @deprecated Use the relation with the `Product` entity instead.
   */
  @Column({
    nullable: true
  })
  productId: string;

  @ManyToOne(() => Product, {
    nullable: true
  })
  product: Product;

  @Column()
  locationId: string;

  @Column()
  stock: number;

  @OneToMany(() => ProductBatch, productBatch => productBatch.locationProduct)
  productBatches: ProductBatch[];
}
