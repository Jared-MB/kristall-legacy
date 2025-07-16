"use server";

import { GET } from "@kristall/nexum";

import type { PrivateLocation } from "@kristall/shared/domains/location-services/types";
import { PRIVATE_LOCATIONS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/locations/private";
import { LOCATIONS_TAGS } from "../../constants/tags";

export const getLocations = async (): Promise<
	PrivateLocation[] | undefined
> => {
	const { data } = await GET<PrivateLocation[]>(
		PRIVATE_LOCATIONS_ENDPOINTS.GET_LOCATIONS,
		{
			tags: [LOCATIONS_TAGS.ALL],
		},
	);
	return data;
};
