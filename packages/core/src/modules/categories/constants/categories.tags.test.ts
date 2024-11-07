import { CATEGORIES_TAGS } from "./index";

describe("Analytics tags", () => {
	test("Tags should not be repeated", () => {
		const values = Object.values(CATEGORIES_TAGS);
		expect(new Set(values).size).toBe(values.length);
	});
});
