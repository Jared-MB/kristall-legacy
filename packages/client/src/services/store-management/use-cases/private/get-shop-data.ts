"use server";

import { redirect } from "next/navigation";
import { GET } from "nexum";

import { adaptToPrivateShop } from "@kristall/shared/domains/store-management/adapters/to-private";
import type { Shop } from "@kristall/shared/domains/store-management/types";

import { SHOP_TAGS } from "../../constants/tags";

export const getShopData = async () => {
	const { data } = await GET<Shop>("/shops/name", {
		tags: [SHOP_TAGS.INFO],
	});

	if (!data) {
		redirect("/login");
	}

	return adaptToPrivateShop(data);
};
