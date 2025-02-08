"use server";

import { GET } from "@kristall/http";
import { getLatestOrdersAdapter, getOrdersAdapter } from "./adapters/get";
import { ORDER_TAGS } from "./constants";
import type { Order } from "./interfaces";

export const getLatestOrders = async (): Promise<Order[] | null> => {
	const data = await GET<Order[]>("/orders/latest", {
		tags: [ORDER_TAGS.LATEST],
	});
	return getOrdersAdapter(data);
};

export const getPendingOrders = async (): Promise<number | null> => {
	const data = await GET<number>("/orders/pending", {
		tags: [ORDER_TAGS.PENDING],
	});
	return getLatestOrdersAdapter(data);
};
