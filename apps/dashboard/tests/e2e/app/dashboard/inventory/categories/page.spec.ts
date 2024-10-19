import { type Page, expect, test } from "@playwright/test";

test.describe("Category Page", () => {
	let page: Page;

	test.beforeAll(async ({ browser }) => {
		const context = await browser.newContext();
		await context.addCookies([
			{
				name: "session",
				value: process.env.TEST_COOKIE ?? "",
				httpOnly: true,
				domain: "localhost",
				path: "/",
			},
		]);
		page = await context.newPage();
	});

	test("Should add a category", async () => {
		await page.goto("http://localhost:3002/dashboard/inventory?page=1");
		await page
			.locator("header")
			.filter({ hasText: "Ubicación" })
			.getByRole("button")
			.click();
		await page.getByRole("link", { name: "Ver categorías" }).click();
		await page.getByRole("button", { name: "Agregar categoría" }).click();

		const categoryName = "Test Category";

		await page
			.getByPlaceholder("Ej. Galletas, refrescos, etc.")
			.fill(categoryName);
		await page.getByRole("button", { name: "Crear categoría" }).click();
		await expect(
			page.getByRole("heading", { name: categoryName }),
		).toBeVisible();
		await expect(page.getByText("0")).toBeVisible();
	});
});
