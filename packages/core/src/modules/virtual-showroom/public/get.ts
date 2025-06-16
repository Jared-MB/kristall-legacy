"use server";

import { GET } from "@kristall/http";
import type { VirtualShowroom } from "../interfaces";

const TEN_MINUTES = 10 * 60 * 1000;

export const getPublicVirtualShowroom = async (subdomain: string) => {
	const response = await GET<VirtualShowroom & { image: string }>(
		`/virtual-showroom/public/${subdomain}`,
		{
			tags: [subdomain],
			revalidate: TEN_MINUTES,
			auth: false,
		},
	);

	return response.data;
};

const ONE_DAY = TEN_MINUTES * 6 * 24;

export const getVirtualShowroomImage = async (subdomain: string) => {
	const response = await GET<string>(
		`/virtual-showroom/public/${subdomain}/image`,
		{
			tags: [`${subdomain}-image`],
			revalidate: ONE_DAY,
			auth: false,
		},
	);

	return response.data;
};
