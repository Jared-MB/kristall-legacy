"use server";

import type { Analytics } from "../interfaces";

import { getAnalyticsService } from "../services";

export const getAnalytics = async (): Promise<Analytics | null> => {
	const { data, status } = await getAnalyticsService();
	if (status >= 400 || !data) {
		return null;
	}
	return {
		earningsByDay: data.earningsByDay,
	};
};
