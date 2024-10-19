"use server";

import type { ServerResponse } from "@/core/interfaces/http";

import { NEXT_TAGS } from "@/constants/tags";
import { GET } from "@/core/modules/http";
import type { Order } from "../_interfaces";

const BASE_URL = "/orders/latest";

export const getLatestOrdersService = async (): Promise<
	ServerResponse<Order[]>
> => {
	return await GET<Order[]>(BASE_URL, {
		tags: [NEXT_TAGS.GET_LATEST_ORDERS],
	});
};
