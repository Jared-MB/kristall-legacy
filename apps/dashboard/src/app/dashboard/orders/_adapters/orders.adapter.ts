"use server";

import { paginateURL } from "@/core/utils/pagination";
import { getOrderService } from "../_services";

export const getOrders = async (searchParams: URLSearchParams) => {
	const pagination = paginateURL(searchParams);
	const { data } = await getOrderService(pagination);
	return data;
};
