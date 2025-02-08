"use server";

import { getLocationsService } from "../services";

/**
 * @deprecated use get file instead
 */
export const getLocations = async () => {
	const { data } = await getLocationsService();
	return data;
};
