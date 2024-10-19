"use client";

import { useShortcut } from "@/core/hooks/useShortcut";
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
