import { getPublicProducts } from "@kristall/core/products/public";

import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const host = url.hostname.split(".")[0];

	const virtualShowroom = await getPublicProducts(host, url.searchParams);

	return {
		...virtualShowroom,
		host,
	};
};
