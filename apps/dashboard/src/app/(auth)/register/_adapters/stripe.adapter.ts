"use server";

import { getSessionIdService } from "../_services";

export const getSessionId = async (session_id: string) => {
	const { data } = await getSessionIdService(session_id);
	return data;
};
