"use server";

import type { Order } from "@/core/interfaces/entities";
import { PUT } from "@/core/modules/http";

const BASE_URL = "/orders/update-order";

export const updateOrderStatusService = async (
	id: string,
	status: Order["status"],
): Promise<void> => {
	await PUT(`${BASE_URL}/${id}`, { status });
};
