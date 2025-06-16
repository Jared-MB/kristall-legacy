"use server";

import type { Location } from "./interfaces";

import { GET } from "@kristall/http";
import { getLocationsAdapter } from "./adapters/get";
import { LOCATIONS_TAGS } from "./constants/locations.tags";

export const getLocations = async (
	{ revalidate }: { revalidate?: number } = {
		revalidate: undefined,
	},
): Promise<Location[] | null> => {
	const data = await GET<Location[] | null>("/locations", {
		tags: [LOCATIONS_TAGS.GET],
		cache: "force-cache",
		revalidate: revalidate,
	});

	return getLocationsAdapter(data);
};
