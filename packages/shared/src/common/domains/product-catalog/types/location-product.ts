import type { ProductBatch } from "./product-batch";

export interface LocationProduct {
	_id: string;
	productId: string;
	locationId: string;
	stock: number;
	productBatches?: ProductBatch[];
}
