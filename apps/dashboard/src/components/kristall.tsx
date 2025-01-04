"use client";

import { useSidebar } from "@kristall/ui/sidebar";

export function Kristall() {
	const { open } = useSidebar();

	return (
		<h1 className="text-4xl text-primary grid place-content-center h-16">
			{open ? "Kristall" : <span>K</span>}
		</h1>
	);
}
