"use server";

import type { BatchToAdd } from "@/app/dashboard/inventory/context/batch-context";
import type { LocationToAdd } from "@/app/dashboard/inventory/context/location-context";
import type { Image, Product } from "@/core/interfaces/entities";
import { uploadImage } from "@/core/services/image";
import { getShopData } from "@/core/services/shop";
import type { PaginationEntity } from "@/types";
import type { LocationProduct } from "@/types/location";
import type { Product as DeprecatedProduct } from "@/types/product";
import { ServerConnection } from "@/utils/ServerConnection";
import { ProductConnection, ProductsConnection } from "@/utils/connections";
import { r2 } from "@/utils/r2";
import {
	type AddProduct,
	AddProductSchema,
} from "@/validator/product.validator";
import {
	DeleteObjectCommand,
	PutObjectCommand,
	type PutObjectCommandOutput,
} from "@aws-sdk/client-s3";
import { parse } from "@formkit/tempo";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type UUID, randomUUID } from "node:crypto";

/**
 * @deprecated
 */
export const getProducts = async (
	searchParams: URLSearchParams,
): Promise<PaginationEntity<DeprecatedProduct> | null> => {
	const page = Number(searchParams.get("page") || "1");

	const skip = (page - 1) * 7;

	searchParams.delete("page");
	searchParams.set("skip", skip.toString());

	const connection = new ServerConnection(
		`/products?take=7&${searchParams.toString()}`,
	);
	return await connection.get<PaginationEntity<DeprecatedProduct>>();
};

/**
 * @deprecated
 */
export const getProductById = async (id: string): Promise<Product | null> => {
	const product = await ProductConnection(id).get<Product>();
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

// #region UPLOAD PRODUCT - FUNCTION
/**
 * @deprecated
 */
export const uploadProduct = async (
	imageFile: File,
	parsedData: AddProduct,
) => {
	// TIME: 1.5s aprox => 1.15 with promises.all
	let image = null;
	const id = randomUUID();
	let uploadImage: Promise<PutObjectCommandOutput> | null = null;

	if (imageFile.size > 0) {
		const buffer = (await imageFile.arrayBuffer()) as any;
		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET_NAME,
			Key: id,
			Body: buffer,
			ContentType: imageFile.type,
		});
		uploadImage = r2.send(command);
		const url = `https://cdn.kristall.app/${id}`;
		image = { url, _id: id };
	}

	const saveProduct = ProductsConnection.post({
		...parsedData,
		image,
	});

	try {
		await Promise.all([uploadImage, saveProduct]);
	} catch (error) {
		console.log({ error });
		if (image) {
			const command = new DeleteObjectCommand({
				Bucket: process.env.R2_BUCKET_NAME,
				Key: id,
			});
			await r2.send(command);
		}
		return {
			general: "Error creating the product",
		};
	}
};

// #region ADD PRODUCT
/**
 * @deprecated
 */
export const addProduct = async (
	locations: LocationToAdd[],
	batches: BatchToAdd[] | null,
	isEnabled: boolean,
	_prevState: unknown,
	data: FormData,
) => {
	// Extract data from FormData
	const rawData = Object.fromEntries(data.entries());

	// Join the locations/batches with the product data
	const product = {
		...(rawData as any),
		locations,
		batches,
		batchEnabled: isEnabled,
	} as AddProduct & {
		image: File;
	};

	const parsedData = AddProductSchema.safeParse(product);

	if (!parsedData.success) {
		return parsedData.error.flatten().fieldErrors;
	}

	if (parsedData.data.locations.length === 0) {
		return {
			locations: ["Debes agregar al menos una ubicación"],
		};
	}

	const response = await uploadProduct(product.image ?? null, parsedData.data);
	if (response) {
		return response;
	}

	revalidatePath("/dashboard/inventory");
	redirect("/dashboard/inventory");
};

// #region UPDATE PRODUCT
/**
 * @deprecated
 */
export const updateProduct = async (
	locations: LocationToAdd[],
	batches: BatchToAdd[] | null,
	isEnabled: boolean,
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
		batchEnabled: isEnabled,
		_id: productId,
	};

	const validatedFields = AddProductSchema.safeParse(product);

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
		has_image_changed === "on" &&
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
		has_image_changed === "on" &&
		((product as any).image as File)?.size === 0
	) {
		image = null;
	}

	try {
		await ProductConnection(productId).put({
			...validatedFields.data,
			image,
		});
	} catch (error) {
		return {
			errors: {
				general: "Error updating the product",
			},
		};
	}

	revalidatePath(`/dashboard/inventory/${productId}`);
	return "Actualizado correctamente";
};

// #region CUT-OFF INVENTORY
/**
 * @deprecated
 */
export const cutOffInventory = async (
	_prevState: unknown,
	payload: FormData,
) => {
	const data = Object.fromEntries(payload.entries());
	console.log(data);

	// const response = await ProductConnection("cut-off").post();
	// if (!response) {
	// 	return {
	// 		general: "Error cutting off the inventory",
	// 	};
	// }
	// revalidatePath("/dashboard/inventory");
	// redirect("/dashboard/inventory");
};
