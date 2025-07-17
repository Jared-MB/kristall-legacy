"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Shop } from "../interfaces";

import { isDev } from "@kristall/http/utils";

import { GET } from "@kristall/http";
import { SHOP_TAGS } from "../constants/shop.tags";

const BASE_PATH = "/shops/name";

/**
 * @deprecated Avoid use services directly, fetch data as close as possible to the action that needs it,
 * this will help you to avoid unnecessary functions and reduce boilerplate code.
 */
export const getShopDataService = async (): Promise<ServerResponse<Shop>> => {
	isDev &&
		console.warn(
			"⚠️ Services should not longer be used at `getShopDataService`",
		);

	return await GET<Shop>(BASE_PATH, {
		tags: [SHOP_TAGS.INFO],
	});
};
