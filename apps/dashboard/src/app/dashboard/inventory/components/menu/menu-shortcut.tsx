"use client";

import { useShortcut } from "@kristall/core/hooks/use-shortcut";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function MenuShortcut() {
	const router = useRouter();

	useShortcut(["c"], () => {
		router.push("/dashboard/inventory/add");
	});

	useShortcut(["n"], () => {
		router.push("/dashboard/inventory/new");
	});

	useEffect(() => {
		router.prefetch("/dashboard/inventory/add");
		router.prefetch("/dashboard/inventory/new");
	}, [router]);

	return null;
}
