"use server";

import type { ServerResponse } from "@/core/interfaces/http";
import type { CategoryDetail } from "../_interfaces";

import { NEXT_TAGS } from "@/constants/tags";
import { GET, POST } from "@/core/modules/http";

const BASE_URL = "/categories";

export const uploadCategoryService = async (name: string): Promise<void> => {
	await POST(BASE_URL, { name });
};

export const getCategoriesService = async (): Promise<
	ServerResponse<CategoryDetail[]>
> => {
	return await GET<CategoryDetail[]>(`${BASE_URL}/details`, {
		tags: [NEXT_TAGS.GET_CATEGORIES_DETAILS],
	});
};
