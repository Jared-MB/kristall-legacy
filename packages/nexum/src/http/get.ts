"use server";

import type { Url } from "../interfaces/routes.js";
import type { ApiResponse } from "../interfaces/server.js";

import { HTTP, type HttpOptions } from "../interfaces/methods.js";
import { NEXUM_CONFIG } from "../utils/config";
import { NotDefinedError } from "../utils/errors";
import { getHeaders } from "../utils/headers";
import { __IS__DEV__ } from "../utils/isDev";
import { errorLog, showRequestLog, warnLog } from "../utils/logs";
import { parseErrorResponse } from "../utils/responses.js";
import { tryCatch } from "../utils/tryCatch";

interface GetOptions extends HttpOptions {
	/**
	 * **ONLY FOR NEXTJS**
	 *
	 * Tags to be used for the request cache.
	 */
	tags?: string[];
	/**
	 * Cache control strategy for the request.
	 * @default "no-store"
	 */
	cache?: RequestCache;
	/**
	 * **ONLY FOR NEXTJS**
	 *
	 * Revalidate the request if the cache is expired.
	 * @default false
	 */
	revalidate?: false | 0 | number | undefined;
}

export const GET = async <T = unknown>(
	url: Url,
	options?: GetOptions,
): Promise<ApiResponse<T>> => {
	const method = HTTP.GET;

	const SERVER_URL = NEXUM_CONFIG?.serverUrl;
	if (!SERVER_URL) {
		throw new NotDefinedError({
			message: "Server URL is not defined",
			solution: "Make sure you have set the server URL in your config file",
		});
	}

	const [error, headers] = await tryCatch(getHeaders({ auth: options?.auth }));
	if (error) {
		throw error;
	}

	const showEmptyTagsWarning = NEXUM_CONFIG?.debug?.emptyTagsWarning;
	const tags = options?.tags;

	if (showEmptyTagsWarning && (!tags || tags?.length === 0)) {
		__IS__DEV__ &&
			warnLog(
				`[GET] Empty or missing tags array passed to GET request to ${SERVER_URL}${url}`,
			);
	}

	const [responseError, response] = await tryCatch(
		fetch(`${SERVER_URL}${url}`, {
			method,
			headers,
			next: {
				tags: options?.tags,
				revalidate: options?.revalidate,
			},
			cache: options?.cache ?? "no-store",
		}),
	);

	if (responseError) {
		errorLog(`[GET] Error fetching data at: ${url}`);

		return {
			data: undefined,
			message: responseError.message ?? "Internal server error",
			status: 500,
		};
	}

	const [parseError, data] = await tryCatch(
		response.json() as Promise<ApiResponse<T>>,
	);

	if (!response.ok) {
		if (parseError) {
			errorLog(`[GET] Error parsing response at: ${url}`);
			return parseErrorResponse();
		}

		errorLog(`[GET] Error fetching data at: ${url} [${response.status}]`);

		return {
			data: undefined,
			message: data.message ?? response.statusText,
			status: data.status ?? response.status,
		};
	}

	if (parseError) {
		errorLog(`[GET] Error parsing response at: ${url}`);
		return parseErrorResponse();
	}

	showRequestLog({ method, url, status: response.status });

	return {
		data: data.data,
		message: data.message ?? "Ok",
		status: data.status ?? 200,
	};
};
