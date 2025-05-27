import { defineAction } from "astro:actions";
import { z } from "astro:schema";

import { getPublicProducts } from "@kristall/core/products/public";
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
	getPublicProducts: defineAction({
		input: z.object({
			shop: z.string(),
			searchParams: z.any(),
		}),
		handler: async ({ shop, searchParams }) => {
			const response = await getPublicProducts(shop, searchParams);
			return response;
		},
	}),
};
