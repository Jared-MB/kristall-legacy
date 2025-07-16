import { logger } from "@kristall/logger";
import { getCaller } from "./caller";

import { __IS__DEV__ } from "./environment";

/**
 * Waits for a given amount of milliseconds.
 *
 * Only works on development mode, otherwise it does nothing.
 *
 * **NOTE**: Should be used only for testing purposes.
 */
export function wait(ms: number) {
	const caller = getCaller();
	logger.warn(`Waiting for ${ms}ms in ${caller}`);

	if (!__IS__DEV__) return;
	return new Promise((resolve) => setTimeout(resolve, ms));
}
