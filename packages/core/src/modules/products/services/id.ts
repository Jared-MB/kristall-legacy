"use server";

import { PRODUCTS_TAGS } from "../constants";
import type { Product, UpdateProduct } from "../interfaces";

import { DELETE, GET, PUT } from "@kristall/http";

export const getProductByIdService = async (_id: string) => {
	return await GET<Product>(`/products/id/${_id}`, {
		tags: [PRODUCTS_TAGS.ID(_id)],
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
