import type { ServerResponse } from "@kristall/http/interfaces";
import type { Analytics } from "../interfaces";

export const getAnalyticsAdapter = (
	response: ServerResponse<Analytics | null>,
): Analytics | null => {
	const { status, data } = response;
	if (status >= 400 || !data) {
		return null;
	}
	return {
		earningsByDay: data.earningsByDay,
	};
};
