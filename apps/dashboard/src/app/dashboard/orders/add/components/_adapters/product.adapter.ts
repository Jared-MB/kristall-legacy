"use server";

import type { CatalogProduct } from "@/core/interfaces/entities";
import { getProductsService } from "../_services";

export const getProducts = async (
	searchParams: URLSearchParams,
): Promise<CatalogProduct[]> => {
	const query = new URLSearchParams(searchParams);
	query.delete("take");

	console.log(query.toString());
	const { data } = await getProductsService(query.toString());
	return data;
};
