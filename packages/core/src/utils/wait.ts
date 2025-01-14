/**
 * Waits for a given amount of milliseconds.
 *
 * **NOTE**: Should be used only for testing purposes.
 */
export function wait(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
