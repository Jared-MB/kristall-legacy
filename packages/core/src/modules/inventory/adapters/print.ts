import type { ServerResponse } from "@kristall/http/interfaces";
import type { PrintProduct } from "../interfaces";

export const printInventoryAdapter = (
	response: ServerResponse<PrintProduct[] | null>,
): PrintProduct[] | null => {
	const { data } = response;
	return data;
};
