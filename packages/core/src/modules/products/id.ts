"use server";

import type { Image } from "../image/interfaces";
import type {
	BatchToAdd,
	LocationProduct,
	LocationToAdd,
} from "../locations/interfaces";

import { parse } from "@formkit/tempo";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { deleteImage, uploadImage } from "../image/adapters/image.adapter";
import {
	deleteProductByIdService,
	getProductByIdService,
	updateProductByIdService,
} from "./services/id";

import { type UUID, randomUUID } from "node:crypto";
import { getShopData } from "../shop/data";
import { UpdateProductSchema } from "./validators";

import { HAS_IMAGE_CHANGED } from "../image/constants/use-image";
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

export const updateProductById = async (
	locations: LocationToAdd[],
	batches: BatchToAdd[] | null,
	hasBatchesEnabled: boolean,
	_prevState: unknown,
	data: FormData,
) => {
	const { _id, image_id, has_image_changed, image_url, ...rawData } =
		Object.fromEntries(data.entries());

	const productId = _id.toString();

	const product = {
		...rawData,
		locations,
		batches,
		batchEnabled: hasBatchesEnabled,
		_id: productId,
	};

	const validatedFields = UpdateProductSchema.safeParse(product);

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { _id: shopId, shopName } = await getShopData();

	const id = image_id ? image_id.toString() : randomUUID();
	let image: Image | null = {
		_id: id as UUID,
		url: image_url.toString(),
	};

	if (
		has_image_changed === HAS_IMAGE_CHANGED.YES &&
		((product as any).image as File)?.size > 0
	) {
		try {
			const payload = new FormData();
			payload.append("image", (product as any).image);
			payload.append("imageId", id);
			image = await uploadImage(payload, {
				shopId,
				shopName,
			});
		} catch (error) {
			return {
				errors: {
					image: "Error uploading the image",
				},
			};
		}
	} else if (
		has_image_changed === HAS_IMAGE_CHANGED.YES &&
		((product as any).image as File)?.size === 0
	) {
		image = null;
	}

	try {
		const { data } = validatedFields;
		await updateProductByIdService(productId, {
			...data,
			image,
		});
	} catch (error) {
		return {
			errors: {
				general: "Error updating the product",
			},
		};
	}

	revalidateTag(PRODUCTS_TAGS.PAGINATED);
	revalidateTag(`PRODUCT-${productId}`);
	return "Actualizado correctamente";
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
