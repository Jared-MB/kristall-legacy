"use server";

import { NEXT_TAGS } from "@/constants/tags";
import type { Order } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";
import type { Pagination } from "@/core/interfaces/pagination";
import { GET } from "@/core/modules/http";

type OrderPagination = Pagination<Order>;

export const getOrderService = async (
	pagination: string,
): Promise<ServerResponse<OrderPagination>> => {
	return await GET<OrderPagination>(`/orders?${pagination}`, {
		tags: [NEXT_TAGS.GET_ORDERS],
	});
};
