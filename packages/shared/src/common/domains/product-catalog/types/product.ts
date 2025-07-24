import type { Image } from "../../content-management/types/images";
import type { Category } from "./category";
import type { LocationProduct } from "./location-product";

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
