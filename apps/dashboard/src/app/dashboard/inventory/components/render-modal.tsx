"use client";

import { usePathname } from "next/navigation";

export default function RenderModal({
	children,
}: { children: React.ReactNode }) {
	const path = usePathname();

	if (path.includes("/new")) {
		return children;
	}

	return null;
}
