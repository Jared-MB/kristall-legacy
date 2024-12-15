"use server";

import type { CategoryDetail } from "./interfaces";

import { getCategoriesDetailsService } from "./services/all";
import { getCategoriesService } from "./services/categories.service";

export const getCategories = async () => {
	const { data } = await getCategoriesService();
	return data;
};

export const getCategoriesDetails = async (): Promise<CategoryDetail[]> => {
	const { data } = await getCategoriesDetailsService();
	return data ?? [];
};
