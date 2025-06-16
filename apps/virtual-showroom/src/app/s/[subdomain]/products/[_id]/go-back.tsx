"use client";

import { Button } from "@kristall/ui/button";
import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore } from "react";

export function GoBack() {
	const prevQuery = useSyncExternalStore(
		() => () => {},
		() => window.localStorage.getItem("previous-query"),
		() => null,
	);

	return (
		<Button asChild size="icon" variant="outline" title="Volver">
			<Link href={`/products?${prevQuery ?? ""}`}>
				<Undo2 />
			</Link>
		</Button>
	);
}
