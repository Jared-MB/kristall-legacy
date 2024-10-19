"use server";

import { NEXT_TAGS } from "@/constants/tags";
import type { Product } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";
import type { Pagination } from "@/core/interfaces/pagination";
import { GET } from "@/core/modules/http";

type ProductPagination = Pagination<Product>;

export const getProductsService = async (
	query: string,
): Promise<ServerResponse<ProductPagination>> => {
	return await GET<ProductPagination>(`/products?${query}`, {
		tags: [NEXT_TAGS.GET_PRODUCTS],
	});
};
