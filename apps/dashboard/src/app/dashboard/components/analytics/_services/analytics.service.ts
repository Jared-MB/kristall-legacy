"use server";

import type { ServerResponse } from "@/core/interfaces/http";
import type { Analytics } from "../_interfaces";

import { NEXT_TAGS } from "@/constants/tags";
import { GET } from "@/core/modules/http";

const BASE_URL = "/analytics";

export const getAnalyticsService = async (): Promise<
	ServerResponse<Analytics>
> => {
	return await GET<Analytics>(BASE_URL, {
		tags: [NEXT_TAGS.GET_ANALYTICS],
	});
};
