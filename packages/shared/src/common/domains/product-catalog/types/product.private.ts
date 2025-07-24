import type { Product } from "./product";

export type PrivateProduct = Omit<Product, "batchEnabled"> & {
	batchEnabled: boolean;
};
