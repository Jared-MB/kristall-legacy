"use server";

import { type UUID, randomUUID } from "node:crypto";
import type { UploadImageConfig } from "../interfaces";

import { shop } from "../../shop";
import { imageService } from "../services";

/**
 * @deprecated Use the **uploadImage** function instead
 */
export const uploadImage = async (
	data: FormData,
	config = {} as UploadImageConfig,
) => {
	const image = data.get("image") as File;
	const id = data.get("imageId")?.toString();

	if (!(image instanceof File)) {
		throw new Error("Image is not a file");
	}

	const { shopId, shopName } = config as UploadImageConfig;

	/** WE DON´T THROW AN ERROR BECAUSE CAN CAUSE AN UNEXPECTED BEHAVIOR
	 *  NEED TO BE SURE THAT ALL THE PLACES WHERE WE USE THIS SERVICE
	 *  WE HAVE A CONFIG
	 */
	if (!shopName || !shopId) {
		console.error("⚠️ Shop name or ID is not defined, may cause errors");
	}

	// ID ITS ALSO EVALUATED AS A STRING BECAUSE IT COMES FROM A FORM DATA OBJECT, SO WE NEED TO CAST IT TO A UUID
	const imageId =
		id === "undefined" || id === undefined ? randomUUID() : (id as UUID);

	return await imageService.uploadImageService({
		image,
		imageId,
		shopName,
		shopId,
	});
};

export const deleteImage = async (id: string) => {
	const { _id, shopName } = await shop.getShopData();

	await imageService.deleteImageService(id, {
		shopId: _id,
		shopName,
	});
};
