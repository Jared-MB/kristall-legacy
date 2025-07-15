"use server";

import type { Location } from "./interfaces";

import { GET } from "@kristall/nexum";
import { LOCATIONS_TAGS } from "./constants/locations.tags";

export const getLocations = async (): Promise<Location[] | undefined> => {
	const { data } = await GET<Location[]>("/locations", {
		tags: [LOCATIONS_TAGS.GET],
		cache: "force-cache",
	});

	return data;
};
