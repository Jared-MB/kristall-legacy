"use server";

import type { Order } from "../_interfaces";

import { getLatestOrdersService } from "../_services";

export const getLatestOrders = async (): Promise<Order[]> => {
	const { data } = await getLatestOrdersService();
	return data;
};
