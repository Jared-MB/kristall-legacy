"use server";

type Url = `/${string}`;

import { environment } from "@/constants/environment";
import { type UnsafeUnwrappedCookies, cookies } from "next/headers";

const createHeaders = (): HeadersInit => {
	const cookie = (cookies() as unknown as UnsafeUnwrappedCookies).get(
		"session",
	);
	const access_token = cookie?.value;
	return {
		Authorization: `Bearer ${access_token}`,
		Cookie: `session=${access_token}`,
		"Content-Type": "application/json",
	};
};

interface FetchOptions {
	tags?: string[];
	toJSON?: boolean;
}

/**
 * @deprecated Use Core server connection GET instead
 */
export const GET = async <T>(url: Url, options?: FetchOptions): Promise<T> => {
	const response = await fetch(`${environment.SERVER_API}${url}`, {
		method: "GET",
		headers: createHeaders(),
		next: {
			tags: options?.tags,
		},
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return response.json();
};

/**
 * @deprecated Use Core server connection POST instead
 */
export const POST = async <T, R = unknown>(url: Url, body: T): Promise<R> => {
	const response = await fetch(`${environment.SERVER_API}${url}`, {
		method: "POST",
		headers: createHeaders(),
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	return (await response.json()) as R;
};

/**
 * @deprecated Use Core server connection PUT instead
 */
export const PUT = async <T, R = unknown>(
	url: Url,
	body: T,
	options: FetchOptions = {
		toJSON: true,
	},
): Promise<R | true> => {
	const response = await fetch(`${environment.SERVER_API}${url}`, {
		method: "PUT",
		headers: createHeaders(),
		body: JSON.stringify(body),
	});
	if (!response.ok) {
		throw new Error(response.statusText);
	}
	if (options?.toJSON) {
		return (await response.json()) as R;
	}
	return true;
};
