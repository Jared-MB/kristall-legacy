"use server";

import type { ServerConnectionOptions } from "@/types/server-connection";
import type { ShopData } from "@/types/shop";
import { ServerConnection } from "@/utils/ServerConnection";

/**
 *
 * @deprecated Use own module service instead
 */
export const getShopData = async (
	options: ServerConnectionOptions = {
		tags: ["shop"],
	},
): Promise<ShopData> =>
	await new ServerConnection("/shops/name", options).get();
