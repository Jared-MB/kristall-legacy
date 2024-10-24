"use server";

import { GET } from "@/core/services/http";

export const api = async () => {
	try {
		const { status } = await GET(
			"https://api-v2.kristall.app/api/health-check",
		);
		return {
			status,
			key: "api",
		};
	} catch (error) {
		return {
			status: "error" as const,
			key: "api",
		};
	}
};
