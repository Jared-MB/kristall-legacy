import { Category } from "./Category";
import { Image } from "./Image";
import { LocationProduct } from "./Location";

export interface Product {
	_id?: string;
	name: string;
	price: number;
	stock: number;
	code?: string;
	cost?: number;
	image: Image | null;
	locations: LocationProduct[];
	createdAt: Date;
	category: Category;
}

export interface CartProduct
	extends Pick<Product, "_id" | "name" | "price" | "code"> {
	quantity: number;
}

export interface ProductOrder extends CartProduct {
	productId: string;
	total: number;
}
