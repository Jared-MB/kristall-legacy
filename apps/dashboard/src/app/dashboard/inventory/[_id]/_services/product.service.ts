"use server";

import { DELETE } from "@/core/modules/http";

export const deleteProductService = async (id: string) => {
	return await DELETE(`/products/${id}`);
};
