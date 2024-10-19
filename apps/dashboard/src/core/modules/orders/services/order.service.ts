import type { ServerResponse } from "@/core/modules/http/interfaces";
import type { Order } from "../interfaces";

import { GET } from "@/core/modules/http";

export const getOrderByCodeService = async (
	code: string,
): Promise<ServerResponse<Order>> => {
	return await GET(`/orders/${code}`);
};
