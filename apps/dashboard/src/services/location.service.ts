import type { Location } from "@/types/location";
import { ClientServerConnection } from "@/utils/ClientServerConnection";
import type { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

/**
 * @deprecated
 */
export const getLocations = async (token: RequestCookie | undefined) =>
	await new ClientServerConnection("/locations?auth=headers", token).get<
		Location[]
	>();
