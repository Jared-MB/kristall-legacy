import type { Url } from "../../../../types/url";

export const BASE_LOCATIONS_ENDPOINT = "locations";

export const PRIVATE_LOCATIONS_ENDPOINTS = {
	GET_LOCATIONS: `/${BASE_LOCATIONS_ENDPOINT}`,
	CREATE_LOCATION: `/${BASE_LOCATIONS_ENDPOINT}`,
	CAN_CREATE_LOCATION: `/${BASE_LOCATIONS_ENDPOINT}/can-create`,
	UPDATE_LOCATION: (id: string): Url => `/${BASE_LOCATIONS_ENDPOINT}/${id}`,
} as const;
