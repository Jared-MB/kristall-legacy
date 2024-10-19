"use server";

import type { Image } from "@/core/interfaces/entities";
import { POST } from "@/core/modules/http";
import type { UploadProduct } from "../_interfaces";
import type { AddProduct } from "../_validators";

const BASE_URL = "/products";

/**
 * @description Uploads a product to the server
 *
 * @param product The product to be uploaded
 * @param image The image uploaded
 */
export const uploadProductService = async (
	product: AddProduct,
	image: Image | null,
): Promise<void> => {
	await POST<UploadProduct, void>(BASE_URL, {
		...product,
		image,
	});
};
