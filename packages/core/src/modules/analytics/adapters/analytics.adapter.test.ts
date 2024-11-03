import { describe, expect, test, vi } from "vitest";

import { getAnalyticsService } from "../services";
import { analytics } from "./index";

const { getAnalytics } = analytics;

vi.mock("../services", () => {
	return {
		getAnalyticsService: vi.fn(),
	};
});

describe("Get analytics", () => {
	test("Should get analytics", async () => {
		vi.mocked(getAnalyticsService).mockResolvedValue({
			data: {
				earningsByDay: [
					{
						cost: 10,
						date: "2023-01-01",
						earnings: 10,
					},
				],
			},
			message: "Success",
			status: 200,
		});

		const analytics = await getAnalytics();
		expect(analytics).not.toBeNull();
		expect(analytics?.earningsByDay).toBeDefined();
	});

	test("Should return null if an status error is returned", async () => {
		vi.mocked(getAnalyticsService).mockResolvedValue({
			data: null,
			message: "Error",
			status: 400,
		});

		const analytics = await getAnalytics();
		expect(analytics).toBeNull();
	});
});
