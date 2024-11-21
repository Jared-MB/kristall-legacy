"use server";

import type { ServerResponse } from "@kristall/http/interfaces";
import type { ReportRaw } from "../interfaces";

import { GET } from "@kristall/http";

export const getLatestReportsService = async (): Promise<
	ServerResponse<ReportRaw[] | null>
> => {
	return await GET<ReportRaw[] | null>("/reports");
};
