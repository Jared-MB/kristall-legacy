import type { Image } from "@/core/interfaces";

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

export interface ProductOrder extends Pick<Product, "name" | "price" | "code"> {
	_id?: string;
	productId: string;
	quantity: number;
	total: number;
}

export type CatalogProduct = Pick<
	Product,
	"_id" | "name" | "code" | "image" | "price" | "stock"
>;
