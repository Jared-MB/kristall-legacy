"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { Report } from "../interfaces";

import { GET } from "@kristall/http";

type ReportRaw = Omit<Report, "severity"> & {
	severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
};

export const getLatestReportsService = async (): Promise<
	ServerResponse<ReportRaw[]>
> => {
	return await GET<ReportRaw[]>("/reports");
};
