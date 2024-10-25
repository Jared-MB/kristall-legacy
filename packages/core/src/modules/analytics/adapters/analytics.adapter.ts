"use server";

import type { Analytics } from "../interfaces";

import { getAnalyticsService } from "../services";

export const getAnalytics = async (): Promise<Analytics> => {
	const { data } = await getAnalyticsService();
	return {
		earningsByDay: data.earningsByDay,
	};
};
