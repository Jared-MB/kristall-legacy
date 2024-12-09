"use server";

import { getLocationsService } from "../services";

export const getLocations = async () => {
	const { data } = await getLocationsService();
	return data;
};
