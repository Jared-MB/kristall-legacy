"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function usePrefetch(paths: string[]) {
	const router = useRouter();

	useEffect(() => {
		for (const path of paths) {
			router.prefetch(path);
		}
	}, []);

	return null;
}
