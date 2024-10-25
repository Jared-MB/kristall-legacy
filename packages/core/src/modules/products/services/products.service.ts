"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Image } from "../../image/interfaces";
import type { BestSeller, UploadProduct } from "../interfaces";
import type { AddProduct } from "../validators";

import { GET, POST } from "@kristall/http";
import { PRODUCTS_TAGS } from "../constants";

const BASE_URL = "/products";

export const getBestSellingProductsService = async (): Promise<
	ServerResponse<BestSeller[]>
> => {
	return await GET(`${BASE_URL}/best-sellers?take=10&skip=0`, {
		tags: [PRODUCTS_TAGS.BEST_SELLERS],
	});
};

export const uploadProductService = async (
	product: AddProduct,
	image: Image | null,
): Promise<ServerResponse<null>> => {
	return await POST<UploadProduct, null>(BASE_URL, {
		...product,
		image,
	});
};
