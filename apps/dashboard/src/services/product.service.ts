import type { CatalogProduct } from "@/types/product";
import { ClientServerConnection } from "@/utils/ClientServerConnection";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @deprecated
 */
export const getProducts = async (
	searchParams: URLSearchParams,
	token: RequestCookie | undefined,
) => {
	searchParams.delete("take");
	const query = searchParams.toString();

	const connection = new ClientServerConnection(
		`/products/by-location?${query}&take=15&auth=headers`,
		token,
	);
	return connection.get<CatalogProduct[]>();
};
