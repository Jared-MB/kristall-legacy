import type { ServerResponse } from "@kristall/http/interfaces";
import type { PublicProduct } from "../interfaces";

export const getBestSellersAdapter = (
	response: ServerResponse<PublicProduct[] | null>,
): PublicProduct[] | null => {
	const { data } = response;
	return data;
};
