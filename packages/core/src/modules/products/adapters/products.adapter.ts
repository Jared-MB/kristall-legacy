"use server";

import type { BestSeller } from "../interfaces";
import { productsService } from "../services";

import { paginateURL } from "@kristall/core/utils";

export const getPaginatedProducts = async (
	searchParams: Readonly<URLSearchParams>,
) => {
	const query = paginateURL(searchParams);
	const { data } = await productsService.getPaginatedProductsService(query);
	return data;
};

export const getBestSellers = async (): Promise<BestSeller[] | null> => {
	const { data } = await productsService.getBestSellingProductsService();
	return data;
};
