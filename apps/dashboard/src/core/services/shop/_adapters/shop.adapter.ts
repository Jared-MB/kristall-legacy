"use server";

import type { Shop } from "@/core/interfaces/entities";

import { getShopDataService } from "../_services";

export const getShopData = async (): Promise<Shop> => {
	const { data } = await getShopDataService();
	return {
		_id: data._id,
		shopName: data.shopName,
		username: data.username,
		logo: data.logo,
		showroom: {
			isPublic: data.showroom.isPublic,
			url: data.showroom.url,
		},
	};
};
