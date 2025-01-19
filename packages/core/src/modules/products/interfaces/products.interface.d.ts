import type { Image } from "../../image/interfaces";
import type { LocationProduct } from "../../locations/interfaces";
import type { AddProductSchema } from "../validators";
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

export type PublicProduct = Pick<
	Product,
	"_id" | "name" | "image" | "price" | "category" | "createdAt" | "totalSales"
> & {
	isAvailable: boolean;
};

/**
 * @deprecated Use PublicProduct instead
 */
export type CatalogProduct = Pick<
	Product,
	"_id" | "name" | "code" | "image" | "price" | "stock" | "cost"
>;

/**
 * @deprecated Use PublicProduct instead
 */
export type BestSeller = Pick<Product, "_id" | "name" | "totalSales">;

export type AddProduct = z.infer<typeof AddProductSchema>;
export type UpdateProduct = AddProduct;

export interface UploadProduct extends AddProduct {
	image: Image | null;
}

export interface UploadProductRaw extends AddProduct {
	image: File;
}
