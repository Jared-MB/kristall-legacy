"use server";

import type { Category } from "@kristall/shared/domains/product-catalog/types/category";
import type { PrivateCategory } from "@kristall/shared/domains/product-catalog/types/category.private";

import { adaptToPrivateCategory } from "@kristall/shared/domains/product-catalog/adapters/to-private";

import { GET } from "@kristall/nexum";

import { wait } from "@kristall/utils";
import { withAuth } from "../../../../utils/auth/with-auth";
import { CATEGORIES_TAGS } from "../../constants/tags/categories";

export const getCategoriesDetails = withAuth(
	async (): Promise<PrivateCategory[]> => {
		await wait(1000);

		const { data } = await GET<Category[]>("/categories/details", {
			tags: [CATEGORIES_TAGS.DETAILS],
		});

		if (!data) {
			return [];
		}

		return data.map(adaptToPrivateCategory);
	},
);
