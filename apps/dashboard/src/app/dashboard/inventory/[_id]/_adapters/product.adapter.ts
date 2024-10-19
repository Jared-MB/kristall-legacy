"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { NEXT_TAGS } from "@/constants/tags";
import { deleteImage } from "@/core/services/image";

import { deleteProductService } from "../_services";

export const deleteProduct = async (
	id: string,
	imageId: string | undefined,
	_prevState: unknown,
	_data: FormData,
) => {
	try {
		if (imageId) {
			await deleteImage(imageId);
		}
	} catch (error) {
		return {
			message: "Error deleting image",
		};
	}

	try {
		const response = await deleteProductService(id);
		console.log(response);
	} catch (error) {
		console.error(error);
		return {
			message: "Error deleting product",
		};
	}

	revalidateTag(NEXT_TAGS.GET_PRODUCTS);
	redirect("/dashboard/inventory");
};
