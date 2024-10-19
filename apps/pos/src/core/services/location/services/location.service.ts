"use server";

import { NEXT_TAGS } from "@/core/constants/tags";
import { GET } from "@/core/services/http";
import type { ServerResponse } from "@/core/services/http/interfaces";
import type { LocationSummary } from "../interfaces";

export const getLocationsService = async (): Promise<
	ServerResponse<LocationSummary[]>
> => {
	return await GET<LocationSummary[]>("/locations", {
		tags: [NEXT_TAGS.GET_LOCATIONS],
	});
};
