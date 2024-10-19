"use server";

import type { Analytics } from "@/types";
import { AnalyticsConnection } from "@/utils/connections";

/**
 * @deprecated
 */
export const getAnalytics = async () =>
	await AnalyticsConnection.get<Analytics>();
