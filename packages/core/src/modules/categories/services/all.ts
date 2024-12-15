"use server";

import { CATEGORIES_TAGS } from "../constants";
import type { CategoryDetail } from "../interfaces";

import { GET } from "@kristall/http";

export const getCategoriesDetailsService = async () => {
	return await GET<CategoryDetail[]>("/categories/details", {
		tags: [CATEGORIES_TAGS.DETAILS],
	});
};
