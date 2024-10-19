"use server";

import type {
	BatchToAdd,
	Image,
	LocationToAdd,
} from "@/core/interfaces/entities";
import type { UploadProductRaw } from "../_interfaces";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { deleteImage, uploadImage } from "@/core/services/image";

import { uploadProductService } from "../_services";
import { AddProductSchema } from "../_validators";

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
		image = await uploadImage(payload);
	} catch (err) {
		if (err instanceof Error) {
			return {
				size: [err.message],
			};
		}
		return {
			message: ["Error al subir la imagen"],
		};
	}

	try {
		await uploadProductService(parsedData.data, image);
	} catch (err) {
		console.log(err);
		image && (await deleteImage(image._id));
		return {
			message: ["Error al subir el producto"],
		};
	}

	revalidatePath("/dashboard/inventory");
	if (!isCreatingMany) {
		redirect("/dashboard/inventory");
	}

	return {
		success: true,
	};
};
