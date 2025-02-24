"use server";

import type { Stripe } from "stripe";
import type { StripePlan } from "./interfaces";

import { GET } from "@kristall/http";
import { type OrderBy, orderStripePrices } from "./adapters/get";
import { STRIPE_TAGS } from "./constants/tags";

interface GetStripePricesOptions {
	orderBy?: OrderBy;
}

/**
 * Get all active prices from Stripe API
 *
 * @param {GetStripePricesOptions} options
 * @returns {Promise<Stripe.Price[]>}
 */
export const getStripePrices = async (
	options?: GetStripePricesOptions,
): Promise<Stripe.Price[]> => {
	const { data } = await GET<Stripe.Price[] | null>("/stripe/prices", {
		tags: [STRIPE_TAGS.PRICES],
	});

	if (!data) return [];

	if (options?.orderBy) {
		return orderStripePrices(data, options.orderBy);
	}

	return data;
};

export const getStripeAccount = async () => {
	const { data } = await GET<StripePlan | null>("/stripe/user", {
		tags: [STRIPE_TAGS.ACCOUNT],
	});
	return data;
};

export const getStripePaymentHistory = async () => {
	const { data } = await GET<Stripe.PaymentIntent[] | null>("/stripe/history", {
		tags: [STRIPE_TAGS.HISTORY],
	});
	return data;
};
