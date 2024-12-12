import type { Product } from "@kristall/core/modules/products/interfaces";

export type NewInventoryProduct = Pick<
	Product,
	"_id" | "name" | "stock" | "locations"
>;
