interface CallerOptions {
	showOnlyFunction?: boolean;
}

export function getCaller({ showOnlyFunction = false }: CallerOptions = {}) {
	const stack = new Error().stack;
	if (!stack) return "Unknown";

	const lines = stack.split("\n");
	// Skip the first 3 lines: Error, getCaller, wait function
	const callerLine = lines[3]?.trim();

	// Extract just the function name and file info
	const match = callerLine?.match(/at (.+) \((.+):(\d+):(\d+)\)/);
	if (match) {
		const [, functionName, file, line, col] = match;
		const fileName = file?.split("/").pop();
		return showOnlyFunction
			? functionName
			: `${functionName} (${fileName}:${line}:${col})`;
	}

	return callerLine || "Unknown";
}
