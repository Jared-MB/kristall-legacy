"use client";

import { usePrefetch } from "@kristall/client/hooks/use-prefetch";

export function InventoryRoutesPrefetch() {
	usePrefetch(["/dashboard/inventory/add", "/dashboard/inventory/new"]);
	return null;
}
