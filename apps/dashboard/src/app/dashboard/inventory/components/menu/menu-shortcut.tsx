"use client";

import { useShortcut } from "@kristall/core/hooks/use-shortcut";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MenuShortcut() {
	const router = useRouter();

	useShortcut(["c"], () => {
		router.push("/dashboard/inventory/add");
	});

	useEffect(() => {
		router.prefetch("/dashboard/inventory/add");
	}, [router]);

	return null;
}
