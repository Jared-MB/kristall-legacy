"use server";

import { GET } from "@kristall/http";
import { getAnalyticsAdapter } from "./adapters/get";
import { ANALYTICS_TAGS } from "./constants";
import type { Analytics } from "./interfaces";

export const getAnalytics = async (): Promise<Analytics | null> => {
	const data = await GET<Analytics | null>("/analytics", {
		tags: [ANALYTICS_TAGS.GET],
	});
	return getAnalyticsAdapter(data);
};
