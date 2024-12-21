"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Param<QueryKey = string, QueryValue = string> {
	key: QueryKey;
	value: QueryValue;
}

export const useQueryParams = <
	QueryKey = string,
	QueryValue = string | number,
>() => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const setQueryParams = (
		key: QueryKey | Param<QueryKey, QueryValue>[],
		value?: QueryValue,
	) => {
		const params = new URLSearchParams(searchParams.toString());
		if (typeof key === "string" && value) {
			params.set(key, value.toString());
		} else if (Array.isArray(key)) {
			for (const param of key) {
				typeof param.key === "string" &&
					(typeof param.value === "string" ||
						typeof param.value === "number") &&
					params.set(param.key, param.value.toString());
			}
		}
		replace(`${pathname}?${params.toString()}`);
	};

	const removeQueryParams = (key: QueryKey | QueryKey[]) => {
		const params = new URLSearchParams(searchParams.toString());
		if (typeof key === "string") {
			params.delete(key);
		} else if (Array.isArray(key)) {
			for (const param of key) {
				typeof param === "string" && params.delete(param);
			}
		}
		replace(`${pathname}?${params.toString()}`);
	};

	const hasQueryParam = (key: QueryKey) => {
		if (typeof key === "string") {
			return searchParams.has(key);
		}
		return false;
	};

	return {
		setQueryParams,
		removeQueryParams,
		hasQueryParam,
		queryParams: searchParams,
	};
};
