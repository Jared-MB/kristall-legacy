"use server";

import type { LocationSummary } from "../interfaces";
import { getLocationsService } from "../services";

export const getLocations = async (): Promise<LocationSummary[]> => {
	const { data } = await getLocationsService();
	return data;
};
