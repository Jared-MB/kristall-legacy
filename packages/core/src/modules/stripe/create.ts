"use server";

import { POST } from "@kristall/http";

export const createSubscriptionIntent = async (
	productId: string,
): Promise<{ url: string }> => {
	const { data } = await POST<{ priceId: string }, { url: string }>(
		"/stripe/checkout-session",
		{
			priceId: productId,
		},
	);

	return data;
};
