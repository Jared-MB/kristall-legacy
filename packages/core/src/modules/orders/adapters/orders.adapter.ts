"use server";

import type { Order } from "../interfaces";

import { getLatestOrdersService } from "../services";

export const getLatestOrders = async (): Promise<Order[]> => {
	const { data } = await getLatestOrdersService();
	return data;
};
