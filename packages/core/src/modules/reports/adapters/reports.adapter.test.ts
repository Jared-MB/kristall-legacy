import { vi } from "vitest";

import { REPORTS } from "../constants/reports.mock";
import { SEVERITY } from "../interfaces";
import { getLatestReportsService } from "../services";
import { reports } from "./index";

const { getLatestReports } = reports;

vi.mock("../services", () => ({
	getLatestReportsService: vi.fn(),
}));

describe("Get latest reports", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should return an empty array if there are no reports", async () => {
		vi.mocked(getLatestReportsService).mockResolvedValue({
			data: [],
			message: "Success",
			status: 200,
		});

		await expect(getLatestReports()).resolves.toEqual([]);
	});

	test("Should return the latest reports", async () => {
		vi.mocked(getLatestReportsService).mockResolvedValue({
			data: REPORTS,
			message: "Success",
			status: 200,
		});

		const latestReports = await getLatestReports();
		expect(latestReports).not.toBeNull();

		if (!latestReports) {
			throw new Error(
				"Behavior not expected, latestReports should not be null",
			);
		}

		const enumValues = Object.values(SEVERITY);
		for (const report of latestReports) {
			expect(enumValues.includes(report.severity)).toBeTruthy();
		}
	});

	test("Should return null if there is an error", async () => {
		vi.mocked(getLatestReportsService).mockResolvedValue({
			data: null,
			message: "Error",
			status: 500,
		});

		await expect(getLatestReports()).resolves.toBeNull();
	});
});
