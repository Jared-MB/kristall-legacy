"use server";

import type { Shop } from "./interfaces";

import { redirect } from "next/navigation";
import { GET } from "nexum";

import { SHOP_TAGS } from "./constants";

/**
 * @deprecated Use data file from `@kristall/client`
 */
export const getShopData = async () => {
	const { data } = await GET<Shop>("/shops/name", {
		tags: [SHOP_TAGS.INFO],
	});

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
