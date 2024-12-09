"use server";

import type { ServiceResponse } from "@kristall/http/interfaces";
import type { Location } from "../interfaces";

import { GET } from "@kristall/http";

import { LOCATIONS_TAGS } from "../constants/locations.tags";

export const getLocationsService = async (): ServiceResponse<Location[]> => {
	return await GET<Location[]>("/locations", {
		tags: [LOCATIONS_TAGS.GET],
	});
};
