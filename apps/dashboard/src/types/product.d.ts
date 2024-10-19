import type { Category } from "./category";
import type { Image } from "./image";
import type { LocationProduct } from "./location";

/**
 * @deprecated Use `core` types instead
 */
export interface Product {
	_id: string;
	name: string;
	totalSales: number;
	price: number;
	cost: number;
	code: string;
	stock: number;
	createdAt: string;
	image: Image;
	category: Category;
	locations: LocationProduct[];
	batchEnabled: 0 | 1;
}

export interface CartProduct
	extends Pick<Product, "_id" | "name" | "price" | "code" | "cost"> {
	quantity: number;
}

/**
 * @deprecated Use `core` types instead
 */
export type CatalogProduct = Pick<
	Product,
	"_id" | "name" | "code" | "image" | "price" | "stock" | "cost"
>;
export type BestSeller = Pick<Product, "_id" | "name" | "totalSales">;

export interface ProductOrder extends CartProduct {
	productId: string;
	total: number;
}
