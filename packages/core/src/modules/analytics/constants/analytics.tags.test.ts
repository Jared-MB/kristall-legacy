import { ANALYTICS_TAGS } from "./index";

describe("Analytics tags", () => {
	test("Tags should not be repeated", () => {
		const values = Object.values(ANALYTICS_TAGS);
		expect(new Set(values).size).toBe(values.length);
	});
});
