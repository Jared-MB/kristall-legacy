"use server";

import { GET } from "@kristall/http";

export const get = async (subdomain: string) => {
	const { data, message, status } = await GET<string>(
		`/virtual-showroom/public/${subdomain}`,
	);
	return data;
};
