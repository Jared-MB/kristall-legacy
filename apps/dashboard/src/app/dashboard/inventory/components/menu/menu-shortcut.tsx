"use client";

import { useShortcut } from "@kristall/core/hooks/use-shortcut";
import { useRouter } from "next/navigation";

export function MenuShortcut() {
	const router = useRouter();

	useShortcut(["c"], () => {
		router.push("/dashboard/inventory/add");
	});

	useShortcut(["n"], () => {
		router.push("/dashboard/inventory/new");
	});

	return null;
}
