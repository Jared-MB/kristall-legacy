"use server";

import { getPublicCategoriesService } from "./services/public";

export const getPublicCategories = async (shopName: string) => {
	const { data } = await getPublicCategoriesService(shopName);
	return data;
};
