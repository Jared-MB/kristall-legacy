"use server";

import { GET } from "@kristall/http";
import type { Product } from "../interfaces";

export const getProductByIdService = async (_id: string) => {
	return await GET<Product>(`/products/id/${_id}`, {
		tags: [`PRODUCT-${_id}`],
	});
};
