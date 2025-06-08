import type { LayoutServerLoad } from "./$types";

import { get } from "@kristall/core/virtual-showroom/public/get";

export const load: LayoutServerLoad = async ({ url }) => {
	const host = url.hostname.split(".")[0];
	const data = await get(host);

	return {
		...data,
		host,
	};
};
