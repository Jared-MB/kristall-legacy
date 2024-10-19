"use server";

import type { ServerResponse } from "@/core/interfaces/http";
import type { StripeSession } from "../_interfaces";

import { GET } from "@/core/modules/http";

/**
 * @description This function is used to get the session id from stripe to verify the payment and create the user
 *
 * @param session_id The session id given by stripe through the query params
 */
export const getSessionIdService = async (
	sessionId: string,
): Promise<ServerResponse<StripeSession>> => {
	return await GET<StripeSession>(`/stripe/sessionId/${sessionId}`);
};
