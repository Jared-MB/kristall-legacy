import type { ProductBatch } from "../batch";

/**
 * @deprecated
 */
export interface LocationProduct {
	_id: string;
	productId: string;
	locationId: string;
	stock: number;
	productBatches?: ProductBatch[];
}

/**
 * @deprecated
 */
export type LocationToAdd = Pick<LocationProduct, "locationId" | "stock">;
