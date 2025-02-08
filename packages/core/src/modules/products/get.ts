"use server";

import type { PublicProduct } from "./interfaces";

import { GET } from "@kristall/http";
import { getBestSellersAdapter } from "./adapters/get";
import { PRODUCTS_TAGS } from "./constants";

export const getBestSellers = async () => {
	const data = await GET<PublicProduct[] | null>(
		"/products/best-sellers?take=10&skip=0",
		{
			tags: [PRODUCTS_TAGS.BEST_SELLERS],
		},
	);

	return getBestSellersAdapter(data);
};
