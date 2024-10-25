import type { Image } from "../../image/interfaces";
import type { Category } from "./categories.interface";
import type { LocationProduct } from "./locations";

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

export type CatalogProduct = Pick<
	Product,
	"_id" | "name" | "code" | "image" | "price" | "stock" | "cost"
>;
