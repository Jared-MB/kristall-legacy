import type { LocationProduct } from "./location-product";
import type { LocationToAdd } from "./location-to-add";

export interface ProductBatch {
	_id: string;
	stock: number;
	expirationDate: Date;
	locationProduct: LocationProduct | LocationToAdd;
	batchNumber: number;
}
