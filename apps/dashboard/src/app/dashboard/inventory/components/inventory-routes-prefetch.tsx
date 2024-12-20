"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function InventoryRoutesPrefetch() {
	const router = useRouter();

	useEffect(() => {
		router.prefetch("/dashboard/inventory/add");
		router.prefetch("/dashboard/inventory/new");
	}, []);

	return null;
}
