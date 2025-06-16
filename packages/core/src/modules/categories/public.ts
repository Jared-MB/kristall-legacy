"use server";

import type { Category } from "./interfaces";

import { GET } from "@kristall/http";
import { CATEGORIES_TAGS } from "./constants";

export const getPublicCategories = async (shopName: string) => {
	const { data } = await GET<Category[]>(`/public-categories/${shopName}`, {
		tags: [CATEGORIES_TAGS.PUBLIC],
	});

	return data;
};
