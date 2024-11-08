import type { ServerResponse } from "@kristall/http/interfaces";
import type { Order } from "../interfaces";

import { GET } from "@kristall/http";
import { ORDER_TAGS } from "../constants";

const BASE_URL = "/orders";

export const getLatestOrdersService = async (): Promise<
	ServerResponse<Order[] | null>
> => {
	return await GET<Order[] | null>(`${BASE_URL}/latest`, {
		tags: [ORDER_TAGS.LATEST],
	});
};

export const getPendingOrdersService = async (): Promise<
	ServerResponse<number | null>
> => {
	return await GET<number | null>(`${BASE_URL}/pending`, {
		tags: [ORDER_TAGS.PENDING],
	});
};
