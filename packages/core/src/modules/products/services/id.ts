"use server";

import { DELETE, GET } from "@kristall/http";
import type { Product } from "../interfaces";

export const getProductByIdService = async (_id: string) => {
	return await GET<Product>(`/products/id/${_id}`, {
		tags: [`PRODUCT-${_id}`],
	});
};

export const deleteProductByIdService = async (_id: string) => {
	return await DELETE(`/products/${_id}`);
};
