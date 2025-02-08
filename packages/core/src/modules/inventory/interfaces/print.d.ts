import type { Product } from "../../products/interfaces";

export type PrintProduct = Pick<Product, "_id" | "name" | "stock" | "price">;
