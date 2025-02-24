import type { Stripe } from "stripe";

export type OrderBy = "asc" | "desc";

export const orderStripePrices = (prices: Stripe.Price[], orderBy: OrderBy) => {
	return prices.sort((a, b) => {
		if (orderBy === "asc") {
			return (a.unit_amount ?? 0) - (b.unit_amount ?? 0);
		}
		return (b.unit_amount ?? 0) - (a.unit_amount ?? 0);
	});
};
