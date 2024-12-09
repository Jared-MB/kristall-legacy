"use server";

import type { Pagination, ServiceResponse } from "@kristall/http/interfaces";
import type { Image } from "../../image/interfaces";
import type { BestSeller, Product, UploadProduct } from "../interfaces";
import type { AddProduct } from "../validators";

import { GET, POST } from "@kristall/http";
import { PRODUCTS_TAGS } from "../constants";

const BASE_URL = "/products";

export const getPaginatedProductsService = async (
	query: string,
): ServiceResponse<Pagination<Product>> => {
	return await GET<Pagination<Product>>(`${BASE_URL}?${query}`, {
		tags: [PRODUCTS_TAGS.PAGINATED],
	});
};

export const getBestSellingProductsService = async (): ServiceResponse<
	BestSeller[] | null
> => {
	return await GET(`${BASE_URL}/best-sellers?take=10&skip=0`, {
		tags: [PRODUCTS_TAGS.BEST_SELLERS],
	});
};

export const uploadProductService = async (
	product: AddProduct,
	image: Image | null,
): ServiceResponse<null> => {
	return await POST<UploadProduct, null>(BASE_URL, {
		...product,
		image,
	});
};
