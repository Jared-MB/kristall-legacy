"use server";

export const virtualShowroom = async () => {
	try {
		const response = await fetch("https://www.kristall.app/shops/kristall");
		const res = await response.text();
		if (
			res.includes(
				`<h1><a class="text-purple-500 text-3xl font-light" href="/">Kristall</a></h1><div class="shrink-0 border-none h-8 w-[1px] bg-zinc-300" role="separator" data-orientation="vertical" aria-orientation="vertical"></div><h2 class="capitalize text-3xl  font-light"><a href="/shops/kristall">kristall</a></h2>`,
			)
		) {
			return {
				status: "ok" as const,
				key: "virtualShowroom",
			};
		}
		return {
			status: "error" as const,
			key: "virtualShowroom",
		};
	} catch (error) {
		return {
			status: "error" as const,
			key: "virtualShowroom",
		};
	}
};
