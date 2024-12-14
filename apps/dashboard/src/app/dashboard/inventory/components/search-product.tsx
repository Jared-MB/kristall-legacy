"use client";

import { useShortcutStore } from "@kristall/core/hooks/use-shortcut";
import { Search } from "@kristall/ui/functional/search";

export function SearchProduct() {
	const { setIsTyping } = useShortcutStore();

	return (
		<Search
			showLabel={false}
			queryName="name"
			onFocus={() => setIsTyping(true)}
			onBlur={() => setIsTyping(false)}
		/>
	);
}
