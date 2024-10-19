"use server";

import type { Shop } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";

import { NEXT_TAGS } from "@/constants/tags";

import { GET } from "@/core/modules/http";

const BASE_PATH = "/shops/name";

export const getShopDataService = async (): Promise<ServerResponse<Shop>> => {
	return await GET<Shop>(BASE_PATH, {
		tags: [NEXT_TAGS.GET_SHOP],
	});
};
