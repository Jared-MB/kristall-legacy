"use server";

import type { BestSeller } from "../interfaces";
import { getBestSellingProductsService } from "../services";

export const getBestSellers = async (): Promise<BestSeller[]> => {
	const { data } = await getBestSellingProductsService();
	return data;
};
