"use server";

import type { Analytics } from "../_interfaces";

import { getAnalyticsService } from "../_services";

export const getAnalytics = async (): Promise<Analytics> => {
	const { data } = await getAnalyticsService();
	return {
		earningsByDay: data.earningsByDay,
	};
};
