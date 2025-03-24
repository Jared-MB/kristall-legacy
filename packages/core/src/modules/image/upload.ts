"use server";

import { randomUUID } from "node:crypto";
import type { Image, UploadImageConfig, UploadImageData } from "./interfaces";

import { uploadImageService } from "./services/upload";

/**
 * Uploads an image to the bucket
 *
 * If don't want to deal with the Errors use the **uploadImages** function instead.
 *
 * @param data The image data
 * @param config The shop config
 *
 * @return The image object or null if the image was not uploaded.
 *
 * @throws Error if the image is not a file
 * @throws Error if the shop name or ID is not defined
 * @throws Error if the image size is greater than 500KB
 */
export const uploadImage = async (
	data: UploadImageData,
	config: UploadImageConfig,
) => {
	let { image, imageId } = data;

	if (!(image instanceof File)) {
		throw new Error("Image is not a file");
	}

	const { shopId, shopName } = config as UploadImageConfig;

	if (!shopName || !shopId) {
		throw new Error("Shop name or ID is not defined");
	}

	imageId ??= randomUUID();

	return await uploadImageService({
		image,
		imageId,
		shopName,
		shopId,
	});
};

/**
 * Uploads multiple images to the bucket
 *
 * @param images The images data
 * @param config The shop config
 *
 * @return The image result promise object grouped by status
 */
export const uploadImages = async (
	images: UploadImageData[],
	config: UploadImageConfig,
) => {
	const uploadPromises = images.map((image) => uploadImage(image, config));
	const resolvedPromises = await Promise.allSettled(uploadPromises);

	const groupedResults = {
		rejected: [],
		fulfilled: [],
	} as {
		rejected: PromiseRejectedResult[];
		fulfilled: PromiseFulfilledResult<Image>[];
	};

	for (const result of resolvedPromises) {
		if (result.status === "rejected") {
			groupedResults.rejected.push(result);
		} else if (result.status === "fulfilled") {
			groupedResults.fulfilled.push(result);
		}
	}

	return groupedResults;
};
