"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Category } from "../interfaces";

import { GET } from "@kristall/http";
import { CATEGORIES_TAGS } from "../constants";

const BASE_URL = "/categories";

export const getCategoriesService = async (): Promise<
	ServerResponse<Category[]>
> => {
	return await GET<Category[]>(`${BASE_URL}`, {
		tags: [CATEGORIES_TAGS.GET],
	});
};
