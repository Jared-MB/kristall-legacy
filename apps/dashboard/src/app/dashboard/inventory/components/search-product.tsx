"use client";

import { useShortcutStore } from "@kristall/core/hooks/use-shortcut";
import { Search } from "@kristall/ui/functional/search";
import { Suspense } from "react";

export function SearchProduct() {
	const { setIsTyping } = useShortcutStore();

	return (
		<Suspense>
			<Search
				showLabel={false}
				queryName="name"
				onFocus={() => setIsTyping(true)}
				onBlur={() => setIsTyping(false)}
			/>
		</Suspense>
	);
}
