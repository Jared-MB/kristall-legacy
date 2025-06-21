import type { z } from "zod";
import type {
	FormErrorResponse,
	InputField,
} from "../../../interfaces/form-error";
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

export type OrderProduct = Pick<
	Product,
	"_id" | "name" | "price" | "stock" | "image" | "code" | "category"
>;

export type ShoppingCartProduct = Pick<
	Product,
	"_id" | "name" | "price" | "stock"
> & {
	quantity: number;
};

export type PublicProduct = Pick<
	Product,
	| "_id"
	| "name"
	| "image"
	| "price"
	| "category"
	| "createdAt"
	| "totalSales"
	| "locations"
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

export interface UploadProduct extends AddProduct {
	image: Image | null;
}

export type UpdateProduct = UploadProduct;

export interface UploadProductRaw extends AddProduct {
	image: File;
}

export interface UploadProductFields {
	_id: InputField;
	name: InputField;
	code: InputField;
	price: InputField;
	cost: InputField;
	category: InputField;
	locations: InputField;
	batches: InputField;
	batchEnabled: InputField;
	image: InputField;
}

export type UploadProductResponse = FormErrorResponse<UploadProductFields>;
