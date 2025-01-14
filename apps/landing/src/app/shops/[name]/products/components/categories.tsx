"use client";

import { RadioGroup } from "@kristall/ui/radio-group";

import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import { useMemo } from "react";

export function Categories({ children }: { children: React.ReactNode }) {
	const { setQueryParams, getQueryParam } = useQueryParams<"category">();

	const handleChange = (value: string) => {
		setQueryParams("category", value);
	};

	// We only want to use the query param value once, so we use `useMemo` to avoid re-renders.
	const param = useMemo(() => getQueryParam("category") ?? "", []);

	return (
		<RadioGroup defaultValue={param} onValueChange={handleChange}>
			{children}
		</RadioGroup>
	);
}
