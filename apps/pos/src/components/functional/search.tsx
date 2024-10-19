"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input, InputContainer } from "../ui/input";

export default function Search({
	queryName = "name",
}: {
	queryName?: string;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const debounce = (e: React.ChangeEvent<HTMLInputElement>) => {
		const query = new URLSearchParams(searchParams);

		const { value } = e.target;
		const isNumber = !Number.isNaN(Number(value));
		if (isNumber) {
			query.delete(queryName);

			if (!value) query.delete("code");
			else query.set("code", value);
			replace(`${pathname}?${query.toString()}`);
			return;
		}

		query.delete("code");
		if (!value) query.delete(queryName);
		else query.set(queryName, value);
		replace(`${pathname}?${query.toString()}`);
	};

	const handleChange = useDebouncedCallback(debounce, 500);

	return (
		<InputContainer>
			<Input onChange={handleChange} placeholder="Buscar productos ..." />
		</InputContainer>
	);
}
