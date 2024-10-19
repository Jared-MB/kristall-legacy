import type { ProductBatch } from "./batch";

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

export type LocationSummary = Pick<Location, "_id" | "name">;
