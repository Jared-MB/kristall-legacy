"use server";

import { GET } from "../server-connection";

export interface Product {
	_id: string;
	name: string;
	price: number;
	stock: number;
	code: string;
	cost: number;
	createdAt: Date;
	updatedAt: Date;
	totalSales: number;
	batchEnabled: number;
	image: Image | null;
	category: Category;
}

interface Category {
	_id: string;
	name: string;
}

interface Image {
	url: string;
	_id: string;
}

/**
 * @deprecated
 */
export const getBestSellersProducts = async (
	virtualShowroomUrl: string,
): Promise<Product[] | null> => {
	const virtualShowroomName = virtualShowroomUrl.split("/").pop();
	if (!virtualShowroomName) {
		return null;
	}
	return await GET<Product[]>(
		`/public-products/best-sellers/${virtualShowroomName}`,
	);
};

/**
 * @deprecated
 */
export const getNewProducts = async (
	virtualShowroomUrl: string,
): Promise<Product[] | null> => {
	const virtualShowroomName = virtualShowroomUrl.split("/").pop();
	if (!virtualShowroomName) {
		return null;
	}
	return await GET<Product[]>(`/public-products/new/${virtualShowroomName}`);
};
