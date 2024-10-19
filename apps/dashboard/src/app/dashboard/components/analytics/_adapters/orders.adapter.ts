"use server";

import { getPendingOrdersService } from "../_services";

export const getPendingOrders = async (): Promise<number> => {
	const { data } = await getPendingOrdersService();

	return data;
};
