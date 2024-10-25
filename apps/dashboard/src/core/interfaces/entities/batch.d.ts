/**
 * @deprecated
 */
export interface ProductBatch {
	_id: string;
	stock: number;
	expirationDate: Date;
	locationProduct: LocationProduct | LocationToAdd;
	batchNumber: number;
}

/**
 * @deprecated
 */
export type BatchToAdd = Omit<ProductBatch, "_id">;
