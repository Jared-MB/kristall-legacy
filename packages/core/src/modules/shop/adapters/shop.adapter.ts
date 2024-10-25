"use server";

import { getShopDataService } from "../services";

export const getShopData = async () => {
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
