"use server";

import type { Analytics } from "@kristall/shared/domains/analytics-tracking/types";

import { GET } from "@kristall/nexum";

import { ANALYTICS_TAGS } from "../../constants/tags/analytics";

export const getAnalytics = async (): Promise<Analytics | undefined> => {
	const { data } = await GET<Analytics>("/analytics", {
		tags: [ANALYTICS_TAGS.GET],
	});
	return data;
};
