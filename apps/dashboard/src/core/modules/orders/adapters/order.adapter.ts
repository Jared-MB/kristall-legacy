"use server";

import type { Order } from "../interfaces";

import { getOrderByCodeService } from "../services";

export const getOrderByCode = async (code: string): Promise<Order> => {
	const { data } = await getOrderByCodeService(code);
	return data;
};
