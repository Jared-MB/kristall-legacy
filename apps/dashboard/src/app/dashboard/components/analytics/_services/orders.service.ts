"use server";

import type { ServerResponse } from "@/core/interfaces/http";

import { GET } from "@/core/modules/http";

const BASE_URL = "/orders/pending";

export const getPendingOrdersService = async (): Promise<
	ServerResponse<number>
> => {
	return await GET<number>(BASE_URL);
};
