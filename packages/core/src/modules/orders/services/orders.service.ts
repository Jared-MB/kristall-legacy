import type { ServerResponse } from "@kristall/http/interfaces";
import type { Order } from "../interfaces";

import { GET } from "@kristall/http";
import { ORDER_TAGS } from "../constants";

const BASE_URL = "/orders";

export const getLatestOrdersService = async (): Promise<
	ServerResponse<Order[]>
> => {
	return await GET<Order[]>(`${BASE_URL}/latest`, {
		tags: [ORDER_TAGS.LATEST],
	});
};

export const getPendingOrdersService = async (): Promise<
	ServerResponse<number>
> => {
	return await GET<number>(`${BASE_URL}/pending`, {
		tags: [ORDER_TAGS.PENDING],
	});
};
