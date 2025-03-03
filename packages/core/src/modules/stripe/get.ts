"use server";

import type { Stripe } from "stripe";
import type { StripeUserSubscription } from "./interfaces";

import { GET } from "@kristall/http";
import { STRIPE_TAGS } from "./constants/tags";

export const getStripeAccount = async () => {
	const { data } = await GET<StripeUserSubscription | null>("/stripe/user", {
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
