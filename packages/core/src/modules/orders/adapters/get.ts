import type { ServerResponse } from "@kristall/http/interfaces";
import type { Order } from "../interfaces";

export const getOrdersAdapter = (
	response: ServerResponse<Order[] | null>,
): Order[] | null => {
	const { data } = response;
	return data;
};

export const getLatestOrdersAdapter = (
	response: ServerResponse<number | null>,
) => {
	const { data } = response;
	return data;
};
