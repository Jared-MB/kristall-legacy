import type { LocationProduct, LocationToAdd } from "./locations.interface";

export interface ProductBatch {
	_id: string;
	stock: number;
	expirationDate: Date;
	locationProduct: LocationProduct | LocationToAdd;
	batchNumber: number;
}
