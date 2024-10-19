"use server";

import { NEXT_TAGS } from "@/core/constants/tags";
import { paginateURL } from "@/core/utils/pagination";
import { revalidatePath, revalidateTag } from "next/cache";
import type { Order } from "../interfaces";
import {
	deliverOrderService,
	getOrderByCodeService,
	getOrderService,
} from "../services";

export const getOrders = async (searchParams: URLSearchParams) => {
	const pagination = paginateURL(searchParams);
	const { data } = await getOrderService(pagination);
	return data;
};

export const getOrderByCode = async (code: string): Promise<Order> => {
	const { data } = await getOrderByCodeService(code);
	return data;
};

export const deliverOrder = async (
	_prevState: unknown,
	payload: FormData,
): Promise<string | undefined> => {
	const { code, secret } = Object.fromEntries(payload);
	const response = await deliverOrderService(
		code.toString(),
		secret.toString(),
	);
	if (response.status === 400) {
		return "Secreto incorrecto";
	}
	revalidateTag(NEXT_TAGS.GET_ORDERS);
	revalidatePath(`/orders/${code}`);
};
