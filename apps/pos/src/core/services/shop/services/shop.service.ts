"use server";

import type { ServerResponse } from "@/core/services/http/interfaces";
import type { Shop } from "../interfaces";

import { NEXT_TAGS } from "@/core/constants/tags";
import { GET } from "@/core/services/http";

export const getUserShopService = async (): Promise<ServerResponse<Shop>> => {
	return await GET<Shop>("/shops/name", {
		tags: [NEXT_TAGS.GET_SHOP],
	});
};

export const getShopImageService = async (): Promise<
	ServerResponse<string>
> => {
	return await GET<string>("/shops/image", {
		tags: [NEXT_TAGS.GET_SHOP_IMAGE],
	});
};
