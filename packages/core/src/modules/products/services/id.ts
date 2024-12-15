"use server";

import { DELETE, GET, PUT } from "@kristall/http";
import type { Product, UpdateProduct } from "../interfaces";

export const getProductByIdService = async (_id: string) => {
	return await GET<Product>(`/products/id/${_id}`, {
		tags: [`PRODUCT-${_id}`],
		cache: "no-store",
	});
};

export const updateProductByIdService = async (
	_id: string,
	payload: UpdateProduct,
) => {
	return await PUT<UpdateProduct, unknown>(`/products/id/${_id}`, payload);
};

export const deleteProductByIdService = async (_id: string) => {
	return await DELETE(`/products/${_id}`);
};
