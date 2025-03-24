"use server";

import { uploadImages } from "../../../../image/upload";
import { getShopData } from "../../../../shop/data";

export const uploadVirtualShowroomMainPageConfig = async (
	payload: FormData,
) => {
	const data = Object.fromEntries(payload.entries());
	const entries = Object.entries(data);

	const images = entries.filter(
		([_, value]) => value instanceof File && value.size > 0,
	);

	const mappedImages: { name: string; image: File }[] = images.map((image) => {
		const [name, value] = image;

		const file = value as File;

		return {
			name,
			image: file,
		};
	});

	const shop = await getShopData();
	const response = await uploadImages(mappedImages, {
		shopId: shop._id,
		shopName: shop.shopName,
	});

	console.log(JSON.stringify(response, null, 2));
};
