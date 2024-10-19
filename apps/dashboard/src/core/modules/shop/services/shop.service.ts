"use server";

import type { ServerResponse } from "@/core/modules/http/interfaces";
import type { Shop } from "../interfaces";

import { NEXT_TAGS } from "@/constants/tags";

import { GET } from "@/core/modules/http";

const BASE_PATH = "/shops/name";

export const getShopDataService = async (): Promise<ServerResponse<Shop>> => {
	return await GET<Shop>(BASE_PATH, {
		tags: [NEXT_TAGS.GET_SHOP],
	});
};
