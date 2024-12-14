"use client";

import { Input, InputContainer, type InputProps } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const WAIT_BETWEEN_TYPING = 400;

interface Props extends InputProps {
	showLabel?: boolean;
	queryName: string;
	placeholder?: string;
	resetPage?: boolean;
}

export function Search({
	showLabel = true,
	queryName,
	placeholder = "Buscar...",
	resetPage = true,
	...props
}: Props) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const search = useDebouncedCallback((value: string) => {
		const query = new URLSearchParams(searchParams);
		query.set(queryName, value);
		if (!value) query.delete(queryName);
		if (resetPage) {
			query.set("page", "1");
		}
		replace(`${pathname}?${query.toString()}`);
	}, WAIT_BETWEEN_TYPING);

	return (
		<InputContainer className="max-w-sm">
			{showLabel && <Label htmlFor="search">Buscar</Label>}
			<Input
				id="search"
				icon={<SearchIcon />}
				placeholder={placeholder}
				defaultValue={searchParams.get(queryName) ?? ""}
				onChange={(e) => search(e.target.value)}
				{...props}
			/>
		</InputContainer>
	);
}
