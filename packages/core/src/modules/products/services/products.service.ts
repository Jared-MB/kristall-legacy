"use server";

import { GET } from "@kristall/http";
import { PRODUCTS_TAGS } from "../constants";

const BASE_URL = "/products";

export const getBestSellingProductsService = async () => {
	return await GET(`${BASE_URL}/best-sellers?take=10&skip=0`, {
		tags: [PRODUCTS_TAGS.BEST_SELLERS],
	});
};
