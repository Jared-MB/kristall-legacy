import type { Image } from "../../image/interfaces";
import type { LocationProduct } from "../../locations/interfaces";
import type { AddProduct } from "../validators";
import type { Category } from "./categories.interface";

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

export type BestSeller = Pick<Product, "_id" | "name" | "totalSales">;

export interface UploadProduct extends AddProduct {
	image: Image | null;
}

export interface UploadProductRaw extends AddProduct {
	image: File;
}
