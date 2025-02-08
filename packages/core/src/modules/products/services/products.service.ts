"use server";

import type { ServiceResponse } from "@kristall/http/interfaces";
import type { Image } from "../../image/interfaces";
import type { AddProduct, UploadProduct } from "../interfaces";

import { POST } from "@kristall/http";

const BASE_URL = "/products";

export const uploadProductService = async (
	product: AddProduct,
	image: Image | null,
): ServiceResponse<null> => {
	return await POST<UploadProduct, null>(BASE_URL, {
		...product,
		image,
	});
};
