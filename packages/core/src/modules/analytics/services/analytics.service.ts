"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Analytics } from "../interfaces";

import { GET } from "@kristall/http";
import { ANALYTICS_TAGS } from "../constants";

const BASE_URL = "/analytics";

export const getAnalyticsService = async (): Promise<
	ServerResponse<Analytics>
> => {
	return await GET<Analytics>(BASE_URL, {
		tags: [ANALYTICS_TAGS.INFO],
	});
};
