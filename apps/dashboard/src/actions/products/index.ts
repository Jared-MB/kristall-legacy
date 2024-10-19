"use server";

import { GET } from "../server-connection";

export interface Batch {
	productId: string;
	name: string;
	price: number;
	stock: number;
	expirationDate: string;
	locationProduct: string;
	_id: string;
}

interface BatchesByDate {
	string: Batch[];
}

export const getBatches = async (): Promise<BatchesByDate> => {
	return await GET("/products/batches");
};
