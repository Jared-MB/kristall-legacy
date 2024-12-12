"use server";

import { getCategoriesService } from "./services/categories.service";

export const getCategories = async () => {
	const { data } = await getCategoriesService();
	return data;
};
