"use server";

import type { Order } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";
import type { AddOrder } from "../_interfaces";

import { POST } from "@/core/modules/http";

export const uploadOrderService = async (
	order: AddOrder,
): Promise<ServerResponse<Order>> => {
	return await POST<AddOrder, Order>("/orders/create-order", order);
};
