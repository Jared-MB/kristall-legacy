import { type Page, expect, test } from "@playwright/test";

test.describe("Inventory Add Page", () => {
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
		page.goto("/");
	});

	test("Should add a product", async () => {
		const productName = "Test Product";

		await expect(page.locator("h1")).toContainText("Kristall");
		await page.getByRole("link", { name: "Inventario" }).click();
		await page
			.locator("header")
			.filter({ hasText: "Ubicación" })
			.getByRole("button")
			.click();
		await page.getByRole("link", { name: "Ver categorías" }).click();
		await page.getByRole("link", { name: "Crear producto" }).click();
		await page.getByRole("button", { name: "Guardar" }).click();
		await expect(page.getByRole("status").first()).toBeVisible();
		await expect(page.getByText("El nombre debe tener al menos")).toBeVisible();
		await expect(page.getByText("La categoría es requerida")).toBeVisible();
		await page.getByPlaceholder("Ej. Galletas").fill(productName);
		await page.locator('input[name="price"]').click();
		await page.locator('input[name="price"]').fill("150");
		await page.locator('input[name="cost"]').click();
		await page.locator('input[name="cost"]').fill("76");
		await page.getByRole("combobox").click();
		await page.getByLabel("Galletas").click();
		await page.getByRole("button", { name: "Agregar ubicación" }).click();
		await page.getByRole("combobox").click();
		await page.getByLabel("Almacén").click();
		await page.getByRole("spinbutton").click();
		await page.getByRole("spinbutton").fill("4");
		await page.getByRole("button", { name: "Agregar" }).click();
		await expect(page.getByText("En stock:")).toBeVisible();
		await expect(page.locator("form")).toContainText("4");
		await page.getByText("4", { exact: true }).click();
		await expect(page.locator("form")).toContainText("4");
		await page
			.locator("header")
			.filter({ hasText: "Almacén" })
			.getByRole("button")
			.click();
		await page.getByRole("button", { name: "Editar" }).click();
		await page.getByLabel("Stock").click();
		await page.getByLabel("Stock").fill("06");
		await page.getByRole("button", { name: "Guardar" }).click();
		await page.locator("html").click();
		await expect(page.locator("form")).toContainText("6");
		await expect(page.locator("form")).toContainText("6");
		await page.locator("html").click();
		await page.getByLabel("Habilitar lotes").click();
		await expect(page.locator("form")).toContainText("Lotes");
		await page.getByRole("button", { name: "Agregar lote" }).click();
		await page.getByRole("combobox").click();
		await page.getByLabel("Almacén").click();
		await expect(page.getByRole("dialog")).toContainText("(0/6)");
		await page.getByRole("spinbutton").click();
		await page.getByRole("spinbutton").fill("3");
		await page.getByRole("button", { name: "ago 06," }).click();
		await page.getByLabel("Go to next month").click();
		await page.getByLabel("Go to next month").click();
		await page.locator("button").filter({ hasText: "18" }).click();
		await page.getByRole("button", { name: "Agregar" }).click();
		await page.getByRole("button", { name: "Agregar lote" }).click();
		await page.getByRole("combobox").click();
		await page.getByLabel("Almacén").click();
		await expect(page.getByRole("dialog")).toContainText("(3/6)");
		await page.getByRole("spinbutton").click();
		await page.getByRole("spinbutton").fill("4");
		await page.getByRole("button", { name: "ago 06," }).click();
		await page.getByLabel("Go to next month").click();
		await page.getByRole("dialog").nth(1).dblclick();
		await page.getByLabel("Go to next month").click();
		await page.getByLabel("Go to next month").click();
		await page.locator("button").filter({ hasText: "14" }).click();
		await page.getByRole("button", { name: "Agregar" }).click();
		await page.getByRole("spinbutton").click();
		await page.getByRole("spinbutton").fill("3");
		await page.getByRole("button", { name: "Agregar" }).click();
		await page.getByRole("button", { name: "Guardar" }).click();
		await page.getByPlaceholder("Buscar...").fill(productName);
        await page.waitForTimeout(500);
		await expect(page.getByRole("cell", { name: productName })).toBeVisible();
		await expect(page.locator("tbody")).toContainText("6");
	});
});
