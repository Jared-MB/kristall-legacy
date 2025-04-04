"use server";

import { PUT } from "@kristall/http";
import { randomUUID } from "node:crypto";

import type { UploadImageData } from "../../../../image/interfaces";
import type {
	PanelImagesNames,
	SuccessImage,
	VirtualShowroomConfig as VSC,
} from "../../../interfaces";

import { uploadImages } from "../../../../image/upload";
import { getShopData } from "../../../../shop/data";
import { VirtualShowroomConfig } from "../../../models/virtual-showroom-config";

export const uploadVirtualShowroomMainPageConfig = async (
	payload: FormData,
) => {
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
		return;
	}

	const config = new VirtualShowroomConfig()
		.setPanelImages(successImages)
		.build();

	const response = await PUT<Partial<VSC>, VSC>("/virtual-showroom/config", {
		...config,
	});

	return response;
};
