"use server";

import type { Location } from "@/core/interfaces/entities";

import { getLocationsService } from "../_services";

export const getLocations = async (): Promise<Location[]> => {
	const { data } = await getLocationsService();
	return data;
};
