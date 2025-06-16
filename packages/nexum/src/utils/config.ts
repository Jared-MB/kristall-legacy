import { cosmiconfigSync } from "cosmiconfig";

import type { NexumConfig } from "../interfaces/config";

const __MODULE_NAME__ = "nexum";

const __DEFAULT_CONFIG__ = {
	sessionCookieName: "session",
	defaultAuthRequests: true,
	serverUrl: process.env.SERVER_API,
	tokenVerb: "Bearer",
	debug: {
		emptyTagsWarning: true,
		emptyMutationTagsWarning: true,
	},
} as const satisfies NexumConfig;

function loadConfig(): NexumConfig {
	try {
		const explorer = cosmiconfigSync(__MODULE_NAME__, {
			searchPlaces: [`${__MODULE_NAME__}.config.js`],
		});

		const result = explorer.search();

		if (result?.config) {
			return { ...__DEFAULT_CONFIG__, ...result.config };
		}
	} catch (error: unknown) {
		if (error instanceof Error) {
			console.error(
				`Error al cargar la configuración de ${__MODULE_NAME__}:`,
				error.message,
			);
		} else {
			console.error(
				`Error al cargar la configuración de ${__MODULE_NAME__}:`,
				error,
			);
		}
	}

	return __DEFAULT_CONFIG__;
}

export const NEXUM_CONFIG = loadConfig();
