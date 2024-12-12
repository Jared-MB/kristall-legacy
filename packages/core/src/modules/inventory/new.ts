"use server";

import { revalidateTag } from "next/cache";
import { PRODUCTS_TAGS } from "../products/constants";
import type { NewInventoryProduct } from "./interfaces";
import { newInventoryService } from "./services/new";

export const newInventory = async (
	products: Map<string, NewInventoryProduct>,
) => {
	const productsArray = Array.from(products.values());
	const { data } = await newInventoryService(productsArray);
	if (data !== "ok") {
		return;
	}

	revalidateTag(PRODUCTS_TAGS.PAGINATED);
	return data;
};
