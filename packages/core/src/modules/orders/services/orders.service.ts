import type { ServerResponse } from "@kristall/http/interfaces";
import type { Order } from "../interfaces";

import { GET } from "@kristall/http";

export const getLatestOrdersService = async (): Promise<
	ServerResponse<Order[]>
> => {
	return await GET<Order[]>("/orders/latest");
};
