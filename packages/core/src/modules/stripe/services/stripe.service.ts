"use server";

import { GET } from "@kristall/http";
import type { ServerResponse } from "@kristall/http/interfaces";
import type { StripeSession } from "../interfaces";

export const getStripeSessionService = async (
	sessionId: string,
): Promise<ServerResponse<StripeSession | null>> => {
	return await GET<StripeSession | null>(`/stripe/sessionId/${sessionId}`);
};
