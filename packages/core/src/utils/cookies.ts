"use server";

import { cookies } from "next/headers";

export const getCookie = async (key: string) => {
	const cookie = (await cookies()).get(key);
	return cookie?.value;
};

export const deleteCookie = async (key: string) => {
	(await cookies()).delete(key);
};

export const setCookie = async (
	key: string,
	value: string,
	options?: {
		maxAge?: number;
		path?: string;
		domain?: string;
		secure?: boolean;
		httpOnly?: boolean;
	},
) => {
	(await cookies()).set(key, value, {
		maxAge: options?.maxAge,
		path: options?.path,
		domain: options?.domain,
		secure: options?.secure,
		httpOnly: options?.httpOnly,
	});
};
