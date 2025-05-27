"use server";

import { GET } from "@kristall/http";
import type { VirtualShowroom } from "../interfaces";

export const get = async (subdomain: string) => {
	const response = await GET<VirtualShowroom & { image: string }>(
		`/virtual-showroom/public/${subdomain}`,
		{
			tags: ["no-tag-required"],
			auth: false,
		},
	);

	return response.data;
};
