"use client";

import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import { SearchSelect } from "@kristall/ui/functional/search-select";
import { useMemo } from "react";

export function OrderBy({ children }: { children: React.ReactNode }) {
	const { getQueryParam } = useQueryParams<"sort-by">();

	const initialState = useMemo(
		() => getQueryParam("sort-by") ?? "best-sellers",
		[],
	);

	return (
		<SearchSelect name="sort-by" defaultValue={initialState}>
			{children}
		</SearchSelect>
	);
}
