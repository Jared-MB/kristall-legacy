"use server";

import type { CatalogProduct } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";

import { GET } from "@/core/modules/http";

export const getProductsService = async (
	query: string,
): Promise<ServerResponse<CatalogProduct[]>> => {
	return await GET<CatalogProduct[]>(`/products/by-location?${query}&take=15`);
};
