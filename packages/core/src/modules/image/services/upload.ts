"use server";

import type { Image, UploadImageServiceParams } from "../interfaces";

import {
	R2_BUCKET_NAME,
	R2_BUCKET_PREFIX,
} from "../../../constants/environment";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import { isDev } from "../../../utils";
import { getKey } from "../utils/get-key";
import { toAvif } from "../utils/resize";
import { r2 } from "./r2.service";

/**
 * Pure service to upload an image to the S3 bucket
 * @param image The image to upload
 * @param imageId The ID of the image
 * @returns The image or null if it was not uploaded
 */
export const uploadImageService = async ({
	image,
	imageId,
	shopId,
	shopName,
}: UploadImageServiceParams): Promise<Image> => {
	if (!image || image?.size === 0) {
		throw new Error("El archivo no puede ser vacío");
	}

	if (image.size > 500000) {
		throw new Error("La imagen no puede pesar más de 500KB");
	}

	const shopKey = getKey({
		id: imageId,
		shopId,
		shopName,
		isDev,
	});

	const resizedImage = await toAvif(image);

	const command = new PutObjectCommand({
		Bucket: R2_BUCKET_NAME,
		Key: shopKey,
		Body: resizedImage as any,
		ContentType: "image/avif",
		CacheControl: "max-age=2592000",
	});

	await r2.send(command);
	const url = `https://${R2_BUCKET_PREFIX}.kristall.app/${shopKey}`;
	return { url, _id: imageId };
};
