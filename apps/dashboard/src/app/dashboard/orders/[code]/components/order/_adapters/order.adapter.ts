"use server";

import type { Order } from "@/core/interfaces/entities";

import { revalidateTag } from "next/cache";

import { NEXT_TAGS } from "@/constants/tags";

import { updateOrderStatusService } from "../_services";

export const updateOrderStatus = async (
	id: string,
	status: Order["status"],
): Promise<string | undefined> => {
	try {
		await updateOrderStatusService(id, status);
		revalidateTag(NEXT_TAGS.GET_ANALYTICS);
		revalidateTag(NEXT_TAGS.GET_LATEST_ORDERS);
	} catch (error) {
		return "Error updating order status";
	}
};
