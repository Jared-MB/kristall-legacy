"use server";

import type { Location } from "@/core/interfaces/entities";
import type { ServerResponse } from "@/core/interfaces/http";

import { GET } from "@/core/modules/http";

export const getLocationsService = async (): Promise<
	ServerResponse<Location[]>
> => {
	return await GET<Location[]>("/locations");
};
