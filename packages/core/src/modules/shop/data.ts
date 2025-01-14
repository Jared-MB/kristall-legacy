"use server";

import { redirect } from "next/navigation";
import { getShopDataService } from "./services";

export const getShopData = async () => {
	const { data } = await getShopDataService();

	if (!data) {
		redirect("/login");
	}

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
