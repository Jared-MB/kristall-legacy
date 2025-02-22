"use server";

import type { StripePlan } from "./interfaces";

import { GET } from "@kristall/http";
import { STRIPE_TAGS } from "./constants/tags";

export const getStripeAccount = async () => {
	const { data } = await GET<StripePlan | null>("/stripe/user", {
		tags: [STRIPE_TAGS.ACCOUNT],
	});
	return data;
};
