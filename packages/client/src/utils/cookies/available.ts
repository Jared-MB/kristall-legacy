import { logger } from "@kristall/logger";

export enum AvailableCookies {
	SESSION = "session",
}

/**
 * Check if the given name is a valid cookie name.
 *
 * @param name The name of the cookie.
 */
export const isCookieValidName = (name: string): name is AvailableCookies => {
	const isValid = Object.values(AvailableCookies).includes(name as any);

	if (!isValid) {
		logger.error(
			`Invalid cookie name: ${name}, the cookie you are trying to use is not on the list of available cookies.`,
		);
	}

	return isValid;
};
