import type { Pagination, ServerResponse } from "@kristall/http/interfaces";
import type { Product, PublicProduct } from "../interfaces";

export const getBestSellersAdapter = (
	response: ServerResponse<PublicProduct[] | null>,
): PublicProduct[] | null => {
	const { data } = response;
	return data;
};

export const getPaginatedProductsAdapter = (
	response: ServerResponse<Pagination<Product> | null>,
): Pagination<Product> | null => {
	const { data } = response;
	return data;
};
