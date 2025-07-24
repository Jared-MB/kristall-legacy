"use server";

import type { Product } from "@kristall/shared/domains/product-catalog/types/product";
import type { PrivateProduct } from "@kristall/shared/domains/product-catalog/types/product.private";
import type { Pagination } from "@kristall/shared/types/pagination";

import { paginateURL } from "@kristall/shared/utils/paginate-url";

import { GET } from "@kristall/nexum";

import { adaptToPrivateProduct } from "@kristall/shared/domains/product-catalog/adapters/to-private";
import { PRODUCT_TAGS } from "../../constants/tags/product";

export const getPaginatedProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<PrivateProduct>> => {
	const query = paginateURL(searchParams);

	const { data: pagination } = await GET<Pagination<Product>>(
		`/products?${query}`,
		{
			tags: [PRODUCT_TAGS.ALL, PRODUCT_TAGS.PAGINATED(query)],
		},
	);

	if (!pagination)
		return {
			entities: [],
			page: 0,
			totalPages: 0,
			hasMore: false,
			next: null,
			previous: null,
		};

	return {
		entities: pagination.entities.map(adaptToPrivateProduct),
		page: pagination.page,
		totalPages: pagination.totalPages,
		hasMore: pagination.hasMore,
		next: pagination.next,
		previous: pagination.previous,
	};
};
