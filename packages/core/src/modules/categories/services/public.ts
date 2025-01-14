"use server";

import { GET } from "@kristall/http";
import { CATEGORIES_TAGS } from "../constants";
import type { Category } from "../interfaces";

export const getPublicCategoriesService = async (shopName: string) => {
	return await GET<Category[]>(`/public-categories/${shopName}`, {
		tags: [CATEGORIES_TAGS.PUBLIC],
	});
};
