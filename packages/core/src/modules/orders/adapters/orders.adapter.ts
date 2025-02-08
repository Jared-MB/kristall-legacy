"use server";

import type { Order } from "../interfaces";

import { getLatestOrdersService, getPendingOrdersService } from "../services";

/**
 * @deprecated use get file instead
 */
export const getLatestOrders = async (): Promise<Order[] | null> => {
	const { data } = await getLatestOrdersService();
	return data;
};

/**
 * @deprecated use get file instead
 */
export const getPendingOrders = async (): Promise<number | null> => {
	const { data } = await getPendingOrdersService();
	return data;
};
