"use server";

import type { Category } from "../interfaces";

import { categoriesService } from "../services";

export const getCategories = async (): Promise<Category[] | null> => {
	const { data } = await categoriesService.getCategoriesService();
	return data;
};
