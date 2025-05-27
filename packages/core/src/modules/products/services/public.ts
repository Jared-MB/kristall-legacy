"use server";

import type { Pagination } from "@kristall/http/interfaces";
import type { PublicProduct } from "../interfaces";

import { GET } from "@kristall/http";
import { PRODUCTS_TAGS } from "../constants";

export const getPublicProductsService = async (
	shopName: string,
	query: string,
) => {
	return await GET<Pagination<PublicProduct>>(
		`/public-products/${shopName}?${query}`,
		{
			tags: [PRODUCTS_TAGS.PUBLIC],
			cache: "no-store",
			auth: false,
		},
	);
};

export const getPublicBestSellersService = async (shopName: string) => {
	return await GET<PublicProduct[]>(
		`/public-products/best-sellers/${shopName}`,
		{
			tags: [PRODUCTS_TAGS.PUBLIC_BEST_SELLERS],
		},
	);
};

export const getPublicNewProductsService = async (shopName: string) => {
	return await GET<PublicProduct[]>(`/public-products/new/${shopName}`, {
		tags: [PRODUCTS_TAGS.PUBLIC_NEW],
	});
};
