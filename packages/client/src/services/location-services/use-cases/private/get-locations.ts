"use server";

import { GET } from "@kristall/nexum";

import type { PrivateLocation } from "@kristall/shared/domains/location-services/types";
import { PRIVATE_LOCATIONS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/locations/private";
import { LOCATIONS_TAGS } from "../../constants/tags";

/**
 * Gets all locations from the server.
 *
 * Since locations rarely changes, this function is set as `force-cache` to improve performance.
 *
 * @returns A promise that resolves to an array of PrivateLocation objects or undefined.
 */
export const getLocations = async (): Promise<
	PrivateLocation[] | undefined
> => {
	const { data } = await GET<PrivateLocation[]>(
		PRIVATE_LOCATIONS_ENDPOINTS.GET_LOCATIONS,
		{
			tags: [LOCATIONS_TAGS.ALL],
			cache: "force-cache",
		},
	);
	return data;
};
