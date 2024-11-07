"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Category } from "../interfaces";

import { GET } from "@kristall/http";
import { CATEGORIES_TAGS } from "../constants";

const BASE_URL = "/categories";

export const getCategoriesService = async (): Promise<
	ServerResponse<Category[] | null>
> => {
	return await GET<Category[] | null>(`${BASE_URL}`, {
		tags: [CATEGORIES_TAGS.GET],
	});
};
