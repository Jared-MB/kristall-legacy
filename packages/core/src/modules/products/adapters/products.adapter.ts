"use server";

import type { Pagination } from "@kristall/http/interfaces";
import type { BestSeller, Product } from "../interfaces";
import { productsService } from "../services";

import { paginateURL } from "@kristall/core/utils";

export const getPaginatedProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<Product>> => {
	const query = paginateURL(searchParams);
	const { data } = await productsService.getPaginatedProductsService(query);
	return (
		data ?? {
			entities: [],
			page: 0,
			totalPages: 0,
		}
	);
};

/**
 * @deprecated use get file instead
 */
export const getBestSellers = async (): Promise<BestSeller[] | null> => {
	const { data } = await productsService.getBestSellingProductsService();
	return data;
};
