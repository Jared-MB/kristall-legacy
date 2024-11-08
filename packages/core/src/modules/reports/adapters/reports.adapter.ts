"use server";

import { type Report, SEVERITY } from "../interfaces";

import { getLatestReportsService } from "../services";

export const getLatestReports = async (): Promise<Report[] | null> => {
	const { data } = await getLatestReportsService();

	if (!data) {
		return null;
	}

	return data.map((report) => ({
		...report,
		severity: SEVERITY[report.severity],
	}));
};
