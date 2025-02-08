import type { ServerResponse } from "@kristall/http/interfaces";
import type { Location } from "../interfaces";

export const getLocationsAdapter = (
	response: ServerResponse<Location[] | null>,
): Location[] | null => {
	const { data } = response;
	return data;
};
