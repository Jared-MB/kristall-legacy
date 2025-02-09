import starlight from "@astrojs/starlight";
// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Kristall | Developers",
			favicon: "/favicon.ico",
			customCss: [
				"@fontsource-variable/quicksand/index.css",
				"./src/styles/custom.css",
			],
			sidebar: [
				{
					label: "Architecture",
					items: [
						{
							label: "Components",
							slug: "architecture/components",
						},
						{
							label: "File System",
							slug: "architecture/file-system",
						},
					],
				},
				{
					label: "Packages",
					items: [
						{
							label: "@kristall/http",
							slug: "packages/http",
						},
					],
				},
			],
		}),
	],
});
