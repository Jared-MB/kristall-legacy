"use server";

import type { Url } from "../interfaces/routes.js";
import type { ApiResponse } from "../interfaces/server.js";

import { revalidateTag } from "next/cache";
import { HTTP, type HttpOptions } from "../interfaces/methods.js";
import { NEXUM_CONFIG } from "../utils/config";
import { NotDefinedError } from "../utils/errors";
import { getHeaders } from "../utils/headers";
import { __IS__DEV__ } from "../utils/isDev.js";
import { errorLog, log, showRequestLog, warnLog } from "../utils/logs";
import { parseErrorResponse } from "../utils/responses.js";
import { tryCatch } from "../utils/tryCatch";

interface PostOptions extends HttpOptions {
	/**
	 * **ONLY FOR NEXTJS**
	 *
	 * Revalidate the tags of an **GET** request.
	 *
	 * Useful to revalidate the cache of a **GET** request when the data has been updated.
	 */
	revalidates?: string[];
}

export const POST = async <T = unknown, B = any>(
	url: Url,
	body: B,
	options?: PostOptions,
): Promise<ApiResponse<T>> => {
	const method = HTTP.POST;

	const SERVER_URL = NEXUM_CONFIG?.serverUrl;
	if (!SERVER_URL) {
		throw new NotDefinedError({
			message: "Server URL is not defined",
			solution: "Make sure you have set the server URL in your config file",
		});
	}

	const [error, headers] = await tryCatch(getHeaders({ auth: true }));
	if (error) {
		throw error;
	}

	const [responseError, response] = await tryCatch(
		fetch(`${SERVER_URL}${url}`, {
			method,
			headers,
			body: JSON.stringify(body),
		}),
	);

	if (responseError) {
		errorLog(`[POST] Error pushing data at: ${url}`);

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
			errorLog(`[POST] Error parsing response at: ${url}`);
			return parseErrorResponse();
		}

		errorLog(`[POST] Error pushing data at: ${url} [${response.status}]`);

		return {
			data: undefined,
			message: data.message ?? response.statusText,
			status: data.status ?? response.status,
		};
	}

	if (parseError) {
		errorLog(`[POST] Error parsing response at: ${url}`);
		return parseErrorResponse();
	}

	showRequestLog({ method, url, status: response.status });

	if (
		revalidateTag &&
		typeof revalidateTag === "function" &&
		options?.revalidates
	) {
		if (options.revalidates.length > 0) {
			for (const tag of options.revalidates) {
				log(`[CACHE] Revalidating tag [${tag}]`);
				revalidateTag(tag);
			}
		} else {
			const showEmptyTagsWarning =
				NEXUM_CONFIG?.debug?.emptyMutationTagsWarning;

			if (showEmptyTagsWarning) {
				__IS__DEV__ &&
					warnLog(
						`[POST] Empty or missing tags revalidation array passed to POST request to ${url}`,
					);
			}
		}
	}

	return {
		data: data.data,
		message: data.message ?? "Created",
		status: data.status ?? 201,
	};
};
