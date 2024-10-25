"use server";

import type { Image } from "../../image/interfaces";
import type { BatchToAdd, LocationToAdd } from "../../locations/interfaces";
import type { BestSeller, UploadProductRaw } from "../interfaces";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";
import { images } from "../../image";
import { productsService } from "../services";
import { AddProductSchema } from "../validators";

export const getBestSellers = async (): Promise<BestSeller[]> => {
	const { data } = await productsService.getBestSellingProductsService();
	return data;
};

export const uploadProduct = async (
	locations: LocationToAdd[],
	batches: BatchToAdd[],
	isEnabled: boolean,
	isCreatingMany: boolean,
	_prevState: unknown,
	data: FormData,
) => {
	const rawData = Object.fromEntries(data.entries());

	// Join the locations/batches with the product data
	const product = {
		...(rawData as any),
		locations,
		batches,
		batchEnabled: isEnabled,
	} as UploadProductRaw;

	const parsedData = AddProductSchema.safeParse(product);
	if (!parsedData.success) {
		return parsedData.error.flatten().fieldErrors;
	}

	let image: Image | null = null;
	try {
		const payload = new FormData();
		payload.append("image", product.image);
		image = await images.uploadImage(payload);
	} catch (err) {
		console.log(err);
		if (err instanceof Error) {
			return {
				size: [err.message],
			};
		}
		return {
			message: ["Error al subir la imagen"],
		};
	}

	const { status } = await productsService.uploadProductService(
		parsedData.data,
		image,
	);
	if (status > 400) {
		image && (await images.deleteImage(image._id));
		return {
			message: ["Error al subir el producto"],
		};
	}

	console.log("⚠️ DON´T REVALIDATE PATH, USE REVALIDATE TAG INSTEAD");
	revalidatePath("/dashboard/inventory");
	if (!isCreatingMany) {
		redirect("/dashboard/inventory");
	}

	return {
		success: true,
	};
};
