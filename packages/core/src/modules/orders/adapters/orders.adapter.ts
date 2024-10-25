"use server";

import type { Order } from "../interfaces";

import { getLatestOrdersService, getPendingOrdersService } from "../services";

export const getLatestOrders = async (): Promise<Order[]> => {
	const { data } = await getLatestOrdersService();
	return data;
};

export const getPendingOrders = async (): Promise<number> => {
	const { data } = await getPendingOrdersService();
	return data;
};
