"use server";

import { POST } from "@kristall/http";
import type { NewInventoryProduct } from "../interfaces";

export const newInventoryService = async (products: NewInventoryProduct[]) => {
	return await POST<{ products: NewInventoryProduct[] }, "ok">(
		"/inventory/new",
		{
			products,
		},
	);
};
