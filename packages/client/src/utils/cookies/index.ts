"use server";

import type { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { __IS__PROD__ } from "@kristall/utils";
import { cookies } from "next/headers";
import { type AvailableCookies, isCookieValidName } from "./available";

/**
 * Get a cookie with the given name.
 *
 * @param name The name of the cookie.
 */
export const getCookie = async (
	name: AvailableCookies,
): Promise<string | undefined> => {
	if (!isCookieValidName(name)) {
		return undefined;
	}
	return (await cookies()).get(name)?.value;
};

/**
 * Set a cookie with the given name, value, and options.
 *
 * By default, all cookies are forced to be **httpOnly**, **secure**, and **path='/'**.
 * This attributes are not configurable and always should be like that
 *
 * @param name The name of the cookie.
 * @param value The value of the cookie.
 * @param options The options for the cookie.
 */
export const setCookie = async (
	name: AvailableCookies,
	value: string,
	options?: Omit<Partial<ResponseCookie>, "httpOnly" | "secure" | "path">,
) => {
	if (!isCookieValidName(name)) {
		return;
	}
	(await cookies()).set(name, value, {
		...options,
		httpOnly: true,
		secure: __IS__PROD__,
		path: "/",
	});
};

/**
 * Delete a cookie with the given name.
 *
 * @param name The name of the cookie.
 */
export const deleteCookie = async (name: AvailableCookies) => {
	if (!isCookieValidName(name)) {
		return;
	}
	(await cookies()).delete(name);
};
