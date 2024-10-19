import type { LocationToAdd } from "@/app/dashboard/inventory/context/location-context";
import type { LocationProduct } from "./location";

export interface ProductBatch {
	_id: string;
	stock: number;
	expirationDate: Date;
	locationProduct: LocationProduct | LocationToAdd;
	batchNumber: number;
}
