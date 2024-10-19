"use server";

import type { PaginationEntity } from "@/types";
import type { Order, OrderSummary } from "@/types/order";
import { ServerConnection } from "@/utils/ServerConnection";
import {
	CountPendingOrders,
	LatestOrdersConnection,
	UpdateOrderConnection,
} from "@/utils/connections";
import { revalidatePath } from "next/cache";

/**
 * @deprecated
 */
export const revalidateOrders = async () => {
	revalidatePath("/dashboard/orders");
};

/**
 * @deprecated
 */
export const getOrders = async (searchParams: URLSearchParams) => {
	const params = new URLSearchParams(searchParams);

	const code = params.toString();

	return await new ServerConnection(`/orders?take=10&skip=0&${code}`).get<
		PaginationEntity<OrderSummary>
	>();
};

/**
 * @deprecated
 */
export const getLatestOrders = async () =>
	await LatestOrdersConnection.get<OrderSummary[]>();

/**
 *
 * @deprecated
 */
export const updateOrderStatus = async (
	_id: string,
	status: Order["status"],
) => {
	const payload: any = {
		status,
	};
	await UpdateOrderConnection(_id).put(payload);
};

/**
 * @deprecated
 */
export const countPendingOrders = async () =>
	await CountPendingOrders.get<number>();
