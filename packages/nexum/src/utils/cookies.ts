"use server";

import { cookies } from "next/headers";

export async function getSessionCookie(
	cookieName: string,
): Promise<string | undefined> {
	try {
		const cookie = (await cookies()).get(cookieName);
		return cookie?.value;
	} catch (error) {
		if (error instanceof Error) {
			console.error(`Error reading cookie ${cookieName}: `, error.message);
		} else {
			console.error(`Error reading cookie ${cookieName}: `, error);
		}
		return undefined;
	}
}
