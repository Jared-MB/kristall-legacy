"use server";

import type { Pagination } from "@/core/interfaces/pagination";
import type { ServerResponse } from "@/core/services/http/interfaces";
import type { CatalogProduct, Product } from "../interfaces";

import { NEXT_TAGS } from "@/core/constants/tags";
import { GET } from "@/core/services/http";

type ProductPagination = Pagination<Product>;

export const getProductsService = async (
	query: string,
): Promise<ServerResponse<ProductPagination>> => {
	return await GET<ProductPagination>(`/products?${query}`, {
		tags: [NEXT_TAGS.GET_PRODUCTS],
	});
};

export const getProductsByLocationService = async (
	query: string,
): Promise<ServerResponse<CatalogProduct[]>> => {
	return await GET<CatalogProduct[]>(`/products/by-location?${query}&take=20`, {
		tags: [NEXT_TAGS.GET_PRODUCTS_BY_LOCATION],
	});
};
