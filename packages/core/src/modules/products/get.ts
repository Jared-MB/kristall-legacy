"use server";

import type { Product, PublicProduct } from "./interfaces";

import { GET } from "@kristall/http";
import type { Pagination } from "@kristall/http/interfaces";
import { paginateURL } from "../../utils/pagination";
import {
	getBestSellersAdapter,
	getPaginatedProductsAdapter,
} from "./adapters/get";
import { PRODUCTS_TAGS } from "./constants";

export const getBestSellers = async () => {
	const data = await GET<PublicProduct[] | null>(
		"/products/best-sellers?take=10&skip=0",
		{
			tags: [PRODUCTS_TAGS.BEST_SELLERS],
			cache: "force-cache",
		},
	);

	return getBestSellersAdapter(data);
};

export const getPaginatedProducts = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<Pagination<Product>> => {
	const query = paginateURL(searchParams);

	const data = await GET<Pagination<Product> | null>(`/products?${query}`, {
		tags: [PRODUCTS_TAGS.PAGINATED],
	});

	const pagination = getPaginatedProductsAdapter(data);

	return (
		pagination ?? {
			entities: [],
			page: 0,
			totalPages: 0,
			hasMore: false,
			next: null,
			previous: null,
		}
	);
};
