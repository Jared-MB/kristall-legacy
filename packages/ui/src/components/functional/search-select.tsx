"use client";

import type { SelectProps } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { Select } from "../ui/select";

import { isDev } from "@kristall/ui/core/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface SearchSelectProps extends SelectProps {
	clearOnValue?: string;
}

export function SearchSelect({
	clearOnValue = "",
	...props
}: SearchSelectProps) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const pathname = usePathname();

	const [value, setValue] = useState(
		searchParams.get(props.name ?? "") ?? props.value,
	);

	useEffect(() => {
		if (!props.name) {
			isDev && console.error("⚠️ SearchSelect: name prop is required");
		} else if (value && clearOnValue !== value) {
			const search = new URLSearchParams(searchParams);
			search.set(props.name, value);
			router.push(`${pathname}?${search.toString()}`);
		} else if (!value || clearOnValue === value) {
			const search = new URLSearchParams(searchParams);
			search.delete(props.name);
			router.push(`${pathname}?${search.toString()}`);
		}
	}, [value]);

	return (
		<Select {...props} value={value} onValueChange={(e) => setValue(e)}>
			{props.children}
		</Select>
	);
}
