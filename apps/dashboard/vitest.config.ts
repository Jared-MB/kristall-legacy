import { config } from "dotenv";
import { defineConfig } from "vitest/config";

export default defineConfig({
	// plugins: [tsconfigPaths()],
	test: {
		include: ["tests/unit_test/**/*.test.ts"],
		env: {
			...config({ path: [".env.test", ".env"] }).parsed,
		},
		environment: "happy-dom",
	},

	// resolve: {
	// 	alias: {
	// 		"@": "./src",
	// 	},
	// },
});
