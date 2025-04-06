// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [tailwindcss()],
	},
	env: {
		schema: {
			SERVER_API: envField.string({ context: "server", access: "public" }),
		},
	},

	adapter: vercel(),
	output: "server",
});
