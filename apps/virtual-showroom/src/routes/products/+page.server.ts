import type { PageServerLoad } from "./$types";

import { getPublicCategories } from "@kristall/core/categories/public";
import { getPublicProducts } from "@kristall/core/products/public";

export const load: PageServerLoad = async ({ url }) => {
	const host = url.hostname.split(".")[0];

	const [products, categories] = await Promise.all([
		getPublicProducts(host, url.searchParams),
		getPublicCategories(host),
	]);

	return {
		products,
		host,
		categories,
	};
};
