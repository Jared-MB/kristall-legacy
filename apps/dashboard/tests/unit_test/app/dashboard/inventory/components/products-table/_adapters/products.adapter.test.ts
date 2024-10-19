import { getProducts } from "@/app/dashboard/inventory/components/products-table/_adapters";
import { getCookie } from "@/core/utils/cookies";
import { type Mock, beforeAll, describe, expect, it, vi } from "vitest";

vi.mock("@/core/utils/cookies", () => ({
	getCookie: vi.fn(),
}));

describe("ProductsAdapter", () => {
	beforeAll(() => {
		(getCookie as Mock).mockReturnValue(
			(async () => process.env.TEST_COOKIE)(),
		);
	});

	it("Should give paginated products", async () => {
		const pagination = await getProducts(new URLSearchParams());

		expect(pagination.entities).toBeInstanceOf(Array);
		expect(pagination.totalPages).toBeTypeOf("number");
		expect(pagination.totalPages).toBeGreaterThanOrEqual(0);
		expect(pagination.page).toBeTypeOf("number");
		expect(pagination.page).toBeGreaterThanOrEqual(1);
	});
});
