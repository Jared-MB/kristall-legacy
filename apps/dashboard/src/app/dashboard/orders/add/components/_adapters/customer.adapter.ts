"use server";

import type { Customer } from "@/core/interfaces/entities";
import { getCustomersService } from "../_services";

export const getCustomers = async (
	searchParams: URLSearchParams,
): Promise<Customer[]> => {
	const query = new URLSearchParams(searchParams);
	query.set("take", "7");
	query.set("skip", "0");

	const { data } = await getCustomersService(query.toString());
	return data;
};
