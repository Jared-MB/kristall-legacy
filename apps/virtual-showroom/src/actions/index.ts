import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { get } from "@kristall/core/virtual-showroom/public/get";

export const server = {
	getVirtualShowroom: defineAction({
		input: z.object({
			shop: z.string(),
		}),
		handler: async ({ shop }) => {
			const response = await get(shop);
			return response;
		},
	}),
};
