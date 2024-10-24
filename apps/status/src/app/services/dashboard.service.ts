"use server";

import { GET } from "@/core/services/http";

export const dashboard = async () => {
	try {
		const { status } = await GET("https://dashboard.kristall.app/health-check");
		return {
			status,
			key: "dashboard",
		};
	} catch (error) {
		return {
			status: "error" as const,
			key: "dashboard",
		};
	}
};
