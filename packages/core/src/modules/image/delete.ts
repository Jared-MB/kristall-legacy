"use server";

import {
	DeleteObjectsCommand,
	type ObjectIdentifier,
} from "@aws-sdk/client-s3";

import { r2 } from "./services/r2.service";

export const deleteMany = async (keys: string[]) => {
	const images: ObjectIdentifier[] = keys.map((key) => ({ Key: key }));

	if (images.length === 0) {
		return {
			message: "No images to delete",
		};
	}

	const command = new DeleteObjectsCommand({
		Bucket: process.env.R2_BUCKET_NAME,
		Delete: {
			Objects: images,
		},
	});

	try {
		await r2.send(command);
		return {
			message: "Images deleted successfully",
		};
	} catch (error) {
		console.error(error);
		return {
			error: "Error deleting images",
		};
	}
};
