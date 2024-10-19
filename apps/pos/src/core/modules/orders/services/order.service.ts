"use server";

import { NEXT_TAGS } from "@/core/constants/tags";
import type { Pagination } from "@/core/interfaces/pagination";
import type { Order } from "@/core/modules/orders/interfaces";
import { GET, PATCH } from "@/core/services/http";
import type { ServerResponse } from "@/core/services/http/interfaces";

type OrderPagination = Pagination<Order>;

export const getOrderService = async (
	pagination: string,
): Promise<ServerResponse<OrderPagination>> => {
	return await GET<OrderPagination>(`/orders?${pagination}`, {
		tags: [NEXT_TAGS.GET_ORDERS],
	});
};

export const getOrderByCodeService = async (
	code: string,
): Promise<ServerResponse<Order>> => {
	return await GET(`/orders/${code}`);
};

export const deliverOrderService = async (
	code: string,
	secret: string,
): Promise<ServerResponse<"ok" | null>> => {
	return await PATCH(`/orders/delivery?code=${code}`, {
		secret,
	});
};
