"use server";

import { GET } from "@kristall/http";
import { LOCATIONS_TAGS } from "./constants/locations.tags";
import type { Location } from "./interfaces";

export const getPublicLocations = async (subdomain: string) => {
	const { data } = await GET<Location[] | null>(
		`/public/locations/${subdomain}`,
		{
			tags: [LOCATIONS_TAGS.PUBLIC],
			cache: "no-store",
		},
	);

	return data;
};
