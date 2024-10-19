import type { ShopData } from "@/types/shop";
import { ClientServerConnection } from "@/utils/ClientServerConnection";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @deprecated
 */
export const getShopData = async (token: RequestCookie | undefined) =>
	await new ClientServerConnection(
		"/shops/name?auth=headers",
		token,
	).get<ShopData>();
