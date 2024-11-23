"use server";

import type { StripeSession } from "../interfaces";
import { getStripeSessionService } from "../services";

export const getStripeSession = async (
	sessionId: string | null,
): Promise<StripeSession | null> => {
	if (!sessionId) {
		return null;
	}

	const { data } = await getStripeSessionService(sessionId);
	return data;
};
