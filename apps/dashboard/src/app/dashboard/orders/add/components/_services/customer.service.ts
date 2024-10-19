"use server";

import type { Customer } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";

import { GET } from "@/core/modules/http";

export const getCustomersService = async (
	query: string,
): Promise<ServerResponse<Customer[]>> => {
	return GET<Customer[]>(`/clients?${query}`);
};
