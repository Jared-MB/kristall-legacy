import type { ProductBatch } from "./batches.interface";

export interface LocationProduct {
	_id: string;
	productId: string;
	locationId: string;
	stock: number;
	productBatches?: ProductBatch[];
}

export type LocationToAdd = Pick<LocationProduct, "locationId" | "stock">;
