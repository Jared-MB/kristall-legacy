"use server";

import type { Pagination } from "@kristall/http/interfaces";
import type { Order } from "./interfaces";

import { GET } from "@kristall/nexum";
import { paginateURL } from "../../utils/pagination";
import { ORDER_TAGS } from "./constants";

type GetOrdersResponse = Pagination<Order>;

export const getOrders = async (
	searchParams: Readonly<URLSearchParams>,
): Promise<GetOrdersResponse | undefined> => {
	const pagination = paginateURL(searchParams);
	const { data } = await GET<GetOrdersResponse>(`/orders?${pagination}`, {
		tags: [ORDER_TAGS.PAGINATED(pagination)],
		cache: "no-store",
	});

	return data;
};

export const getLatestOrders = async (): Promise<Order[] | undefined> => {
	const { data } = await GET<Order[]>("/orders/latest", {
		tags: [ORDER_TAGS.LATEST],
	});
	return data;
};

export const getPendingOrders = async (): Promise<number | undefined> => {
	const { data } = await GET<number>("/orders/pending", {
		tags: [ORDER_TAGS.PENDING],
	});
	return data;
};
