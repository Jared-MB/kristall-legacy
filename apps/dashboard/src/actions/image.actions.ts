"use server";

import { randomUUID } from "node:crypto";

import { r2 } from "@/utils/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";

/**
 * @deprecated
 */
export const uploadImage = async (data: FormData) => {
	const image = data.get("image");
	const imageId = data.get("_id");

	if (!(image instanceof File) || !image || image.size === 0) {
		return;
	}

	const id = imageId?.toString() ?? randomUUID();

	const buffer = (await image.arrayBuffer()) as any;
	const command = new PutObjectCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Key: id,
		Body: buffer,
		ContentType: image.type,
		CacheControl: "max-age=2592000",
	});

	try {
		await r2.send(command);
		const url = `https://cdn.kristall.app/${id}`;
		return url;
	} catch (error) {
		console.log(error);
		return null;
	}
};
