"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Shop } from "../interfaces";

import { GET } from "@kristall/http";
import { SHOP_TAGS } from "../constants/shop.tags";

const BASE_PATH = "/shops/name";

export const getShopDataService = async (): Promise<ServerResponse<Shop>> => {
	return await GET<Shop>(BASE_PATH, {
		tags: [SHOP_TAGS.INFO],
	});
};
