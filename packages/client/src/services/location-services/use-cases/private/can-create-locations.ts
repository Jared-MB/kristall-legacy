"use server";

import { GET } from "@kristall/nexum";
import { PRIVATE_LOCATIONS_ENDPOINTS } from "@kristall/shared/infrastructure/api/endpoints/locations/private";
import { LOCATIONS_TAGS } from "../../constants/tags";

export const canCreateLocations = async (): Promise<boolean> => {
	const { data } = await GET<boolean>(
		PRIVATE_LOCATIONS_ENDPOINTS.CAN_CREATE_LOCATION,
		{
			tags: [LOCATIONS_TAGS.CAN_CREATE],
		},
	);
	return data ?? false;
};
