import type { ServerResponse } from "@kristall/core/modules/http/interfaces";
import type { Order } from "../interfaces";

import { GET } from "@kristall/core/modules/http";

export const getLatestOrdersService = async (): Promise<
	ServerResponse<Order[]>
> => {
	return await GET<Order[]>("/orders/latest");
};
