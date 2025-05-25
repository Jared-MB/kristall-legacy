"use server";

import { randomUUID } from "node:crypto";

import { PUT } from "@kristall/http";
import type { Image, UploadImageData } from "../../../../image/interfaces";
import type {
	HandlerFunctionResponse,
	PanelImagesNames,
	SuccessImage,
	VirtualShowroomConfig as VSC,
} from "../../../interfaces";

import { deleteMany } from "../../../../image/delete";
import { uploadImages } from "../../../../image/upload";
import { getKeyFromUrl } from "../../../../image/utils/get-key";

import { getShopData } from "../../../../shop/data";
import { VirtualShowroomConfig } from "../../../models/virtual-showroom-config";

interface UpdateConfigResponse {
	unusedImages: Image[];
}

export const uploadVirtualShowroomMainPageConfig = async (
	payload: FormData,
): Promise<HandlerFunctionResponse> => {
	const data = Object.fromEntries(payload.entries());
	const entries = Object.entries(data);

	const images = entries.filter(
		([_, value]) => value instanceof File && value.size > 0,
	);

	const mappedImages: (UploadImageData & { name: PanelImagesNames })[] =
		images.map((image) => {
			const [name, value] = image;

			const file = value as File;
			const id = randomUUID();

			return {
				name: name as PanelImagesNames,
				image: file,
				imageId: id,
			};
		});

	const shop = await getShopData();

	const responseImages = await uploadImages(mappedImages, {
		shopId: shop._id,
		shopName: shop.shopName,
	});

	const { fulfilled } = responseImages;

	let successImages: SuccessImage[] | null = null;

	try {
		successImages = fulfilled.map(({ value }) => {
			const { _id, url } = value;
			const name = mappedImages.find(({ imageId }) => imageId === _id)?.name;

			if (!name) {
				throw new Error("Image name not found");
			}

			return {
				_id,
				url,
				name,
			};
		});
	} catch (error) {
		console.log(error);
		return {
			error: "Error uploading images",
		};
	}

	const config = new VirtualShowroomConfig()
		.setPanelImages(successImages)
		.setPanelTitle(data.cardTitle.toString())
		.setPanelDescription(data.cardDescription.toString())
		.setCustomColor(data.customColor.toString())
		.build();

	const response = await PUT<Partial<VSC>, UpdateConfigResponse>(
		"/virtual-showroom/config",
		{
			...config,
		},
	);

	const {
		data: { unusedImages },
	} = response;

	const imagesToRemove = unusedImages
		.map(({ url }) => {
			const key = getKeyFromUrl(url);
			return key;
		})
		.filter((key) => typeof key === "string");

	const { error } = await deleteMany(imagesToRemove);

	if (error) {
		return {
			error: error,
		};
	}

	return {
		message: "Config updated successfully",
	};
};
