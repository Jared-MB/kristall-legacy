"use server";

import { getShopImageService, getUserShopService } from "../services";

export async function getUserShopName(): Promise<string> {
	const { data } = await getUserShopService();
	return data.shopName;
}

export const getShopImage = async (): Promise<string> => {
	const { data } = await getShopImageService();
	return data ?? "";
};
