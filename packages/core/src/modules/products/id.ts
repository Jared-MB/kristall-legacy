"use server";

import type { LocationProduct } from "../locations/interfaces";

import { parse } from "@formkit/tempo";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { deleteImage } from "../image/adapters/image.adapter";
import { deleteProductByIdService, getProductByIdService } from "./services/id";

import { PRODUCTS_TAGS } from "./constants";

export const getProductById = async (_id: string) => {
	const { data: product } = await getProductByIdService(_id);
	const mappedLocations: LocationProduct[] =
		product?.locations?.map((location) => ({
			...location,
			productBatches:
				location?.productBatches?.map((batch) => {
					return {
						...batch,
						expirationDate: parse(
							batch.expirationDate as unknown as string,
							"YYYY-MM-DD",
						),
					};
				}) ?? undefined,
		})) ?? [];
	if (product) {
		product.locations = mappedLocations;
	}
	return product;
};

export const deleteProductById = async (_id: string, imageId?: string) => {
	if (imageId) {
		try {
			await deleteImage(imageId);
		} catch (error) {
			return {
				message: "Error deleting image",
			};
		}
	}

	try {
		await deleteProductByIdService(_id);
	} catch (error) {
		console.error(error);
		return {
			message: "Error deleting product",
		};
	}

	revalidateTag(PRODUCTS_TAGS.PAGINATED);
	redirect("/dashboard/inventory");
};
