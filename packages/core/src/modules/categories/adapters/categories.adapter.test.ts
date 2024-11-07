import { beforeEach, describe, expect, test, vi } from "vitest";
import { categories } from "./index";

import { categoriesService } from "../services";

const { getCategoriesService } = categoriesService;

vi.mock("../services", () => ({
	categoriesService: {
		getCategoriesService: vi.fn(),
	},
}));

describe("Categories adapter", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	test("Should return a list of categories", async () => {
		vi.mocked(getCategoriesService).mockResolvedValue({
			data: [],
			message: "Success",
			status: 200,
		});

		await expect(categories.getCategories()).resolves.toEqual([]);
	});

	test("Should return null if the service fail", async () => {
		vi.mocked(getCategoriesService).mockResolvedValue({
			data: null,
			message: "Error",
			status: 400,
		});

		await expect(categories.getCategories()).resolves.toBeNull();
	});
});
