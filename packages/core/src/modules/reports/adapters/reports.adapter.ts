"use server";

import { type Report, SEVERITY } from "../interfaces";

import { getLatestReportsService } from "../services";

export const getLatestReports = async (): Promise<Report[]> => {
	const { data } = await getLatestReportsService();

	return data.map((report) => ({
		...report,
		severity: SEVERITY[report.severity],
	}));
};
