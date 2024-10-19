"use server";

import { paginateURL } from "@/core/utils/pagination";

import type { Product } from "@/core/interfaces/entities";
import type { Pagination } from "@/core/interfaces/pagination";
import { getProductsService } from "../_services";

export const getProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<Product>> => {
	const query = paginateURL(searchParams);
	const { data } = await getProductsService(query);
	return data;
};
