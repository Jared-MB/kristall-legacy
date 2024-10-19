import type { Customer } from "@/types/customer";
import { ClientServerConnection } from "@/utils/ClientServerConnection";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @deprecated
 */
export const getCustomersByName = async (
	searchParams: URLSearchParams,
	token: RequestCookie | undefined,
) => {
	searchParams.set("take", "7");
	searchParams.set("skip", "0");

	return new ClientServerConnection(
		`/clients?${searchParams.toString()}&auth=headers`,
		token,
	).get<Customer[]>();
};
