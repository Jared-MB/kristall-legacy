import { logger } from "@kristall/logger";
import { getCaller } from "@kristall/utils";
import { isDev } from "./isDev";

/**
 * Waits for a given amount of milliseconds.
 *
 * **NOTE**: Should be used only for testing purposes.
 */
export function wait(ms: number) {
	const caller = getCaller();
	logger.warn(`Waiting for ${ms}ms in ${caller}`);

	if (!isDev) return;
	return new Promise((resolve) => setTimeout(resolve, ms));
}
