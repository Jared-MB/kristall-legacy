"use server";

import type { Image, UploadImageServiceParams } from "../interfaces";

import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

import { isDev } from "../../../utils";
import { r2 } from "./r2.service";

/**
 * Pure service to upload an image to the S3 bucket
 * @param image The image to upload
 * @param imageId The ID of the image
 * @param safe If true, if it is bigger than 500KB, it will not throw an error, but will return null
 * @returns The image or null if it was not uploaded
 */
export const uploadImageService = async ({
	image,
	imageId,
	shopId,
	shopName,
	safe = false,
}: UploadImageServiceParams): Promise<Image | null> => {
	if (!image || image?.size === 0) {
		return null;
	}

	if (image.size > 500000) {
		if (safe) return null;
		throw new Error("La imagen no puede pesar más de 500KB");
	}

	const shopKey = getKey({
		id: imageId,
		shopId,
		shopName,
		isDev,
	});

	const buffer = await image.arrayBuffer();
	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Key: shopKey,
		Body: buffer as any,
		ContentType: image.type,
		CacheControl: "max-age=2592000",
	});

	await r2.send(command);
	const url = `https://cdn.kristall.app/${shopKey}`;
	return { url, _id: imageId };
};

export const deleteImageService = async (
	id: string,
	{
		shopId,
		shopName,
	}: {
		shopId: string;
		shopName: string;
	},
): Promise<void> => {
	const key = getKey({
		id,
		shopId,
		shopName,
		isDev,
	});

	const command = new DeleteObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Key: key,
	});

	await r2.send(command);
};

interface GetKeyParams {
	id: string;
	shopId?: string;
	shopName?: string;
	isDev?: boolean;
}

const getKey = ({ id, shopId, shopName, isDev }: GetKeyParams): string => {
	let key = id;

	if (shopId && shopName) {
		const trimmedShopName = shopName.replace(/\s/g, "");
		key = `${shopId}-${trimmedShopName}/${id}`;
	}

	if (isDev) {
		key = `dev/${key}`;
	}

	return key;
};
