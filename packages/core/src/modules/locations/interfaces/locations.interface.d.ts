import type { ProductBatch } from "./batches.interface";

export interface Location {
	_id: string;
	name: string;
	address?: string;
	phone?: string;
}

export interface LocationProduct {
	_id: string;
	productId: string;
	locationId: string;
	stock: number;
	productBatches?: ProductBatch[];
}

export type LocationToAdd = Pick<LocationProduct, "locationId" | "stock">;
