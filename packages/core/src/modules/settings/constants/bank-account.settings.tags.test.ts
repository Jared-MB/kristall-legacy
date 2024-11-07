import { BANK_ACCOUNT_SETTINGS_TAGS } from "./index";

describe("Analytics tags", () => {
	test("Tags should not be repeated", () => {
		const values = Object.values(BANK_ACCOUNT_SETTINGS_TAGS);
		expect(new Set(values).size).toBe(values.length);
	});
});
