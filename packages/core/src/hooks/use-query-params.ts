"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import type { ToString } from "../interfaces/transforms";
import { isDev } from "../utils/isDev";

interface Param<QueryKey = string, QueryValue = string> {
	key: QueryKey;
	value: QueryValue;
}

const paramsToArray = <QueryKey = string, QueryValue = string | number>(
	params: Param<QueryKey, QueryValue> | Param<QueryKey, QueryValue>[],
) => {
	const newParams: Param<QueryKey, QueryValue>[] = [];
	if (Array.isArray(params)) {
		newParams.push(...params);
	} else {
		newParams.push(params);
	}
	return newParams;
};

/**
 * Hook to manage query params.
 *
 * @param initialState - Initial state of the query params. Can be an array of query params or a single query param.
 * **WARNING** - Be careful with the initial state, use it only once per page. It can cause not expected behaviors with the query params.
 *
 * @returns
 * - `setQueryParams`: function to set query params
 * - `removeQueryParams`: function to remove query params
 * - `removeAllQueryParams`: function to remove all query params
 * - `hasQueryParam`: function to check if a query param exists
 * - `queryParams`: the query params object (read-only)
 *
 * Can set, when is called, a type of query keys and values
 * @example
 * ```ts
 * type Keys = "page" | "sort";
 * type Values = "1" | "desc";
 *
 * const { setQueryParams } = useQueryParams<Keys, Values>();
 *
 * // Ok
 * setQueryParams("page", "1");
 *
 * // Type error
 * setQueryParams("category", 1);
 * ```
 *
 * Can set an initial state of query params, also type safe if its defined.
 * @example
 * ```ts
 * type Keys = "page" | "sort";
 * type Values = "1" | "desc";
 *
 * // WITH AN OBJECT
 * const { setQueryParams } = useQueryParams<Keys, Values>({ key: "page", value: "1" });
 * // URL: https://example.com/products?page=1
 *
 * // WITH AN ARRAY
 * const { setQueryParams } = useQueryParams<Keys, Values>([{ key: "page", value: "1" }, { key: "sort", value: "desc" }]);
 * // URL: https://example.com/products?page=1&sort=desc
 *
 */
export const useQueryParams = <QueryKey = string, QueryValue = string | number>(
	initialState?: Param<QueryKey, QueryValue> | Param<QueryKey, QueryValue>[],
) => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	useEffect(() => {
		if (initialState) {
			const params = paramsToArray(initialState);
			setQueryParams(params);
		}
	}, []);

	/**
	 * Set query params without removing the current ones
	 * @param key - key of the query param or an array of query params
	 * @param value - value of the query param, **optional** if the key is an array
	 *
	 * @example
	 * ```ts
	 * setQueryParams("page", "1");
	 * setQueryParams([{  key: "page", value: "1" }, { key: "sort", value: "desc" }]);
	 * ```
	 */
	const setQueryParams = (
		key: QueryKey | Param<QueryKey, QueryValue>[],
		value?: QueryValue,
	) => {
		const params = new URLSearchParams(searchParams.toString());
		if (typeof key === "string" && value) {
			params.set(key, value.toString());
		} else if (typeof key === "string" && !value) {
			isDev && console.error("The value of the query param is not defined");
			return;
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

	/**
	 * Remove query params
	 * @param key - key of the query param or an array of query params
	 *
	 * @example
	 * ```ts
	 * removeQueryParams("page");
	 * removeQueryParams(["page", "sort"]);
	 * ```
	 */
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

	/**
	 * Remove all query params
	 *
	 * When used, the current URL will be replaced with the pathname.
	 *
	 * @example
	 * ```ts
	 * // Before
	 * // https://example.com/products?page=1&sort=desc
	 *
	 * removeAllQueryParams();
	 *
	 * // After
	 * // https://example.com/products
	 * ```
	 */
	const removeAllQueryParams = () => {
		replace(`${pathname}`);
	};

	/**
	 * Reset the query params to the initial state
	 *
	 * If the initial state is not defined, this function leaves only the pathname
	 *
	 * @example
	 * ```ts
	 * // NOT INITIAL STATE
	 *
	 * // Before
	 * // https://example.com/products?page=1&sort=desc
	 *
	 * const { resetToInitialState } = useQueryParams();
	 * resetToInitialState();
	 *
	 * // After
	 * // https://example.com/products
	 * ```
	 *
	 * @example
	 * ```ts
	 * // INITIAL STATE
	 *
	 * // Before
	 * // https://example.com/products?page=1&sort=desc
	 *
	 * const { resetToInitialState } = useQueryParams({ key: "page", value: "1" });
	 * resetToInitialState();
	 *
	 * // After
	 * // https://example.com/products?page=1
	 * ```
	 */
	const resetToInitialState = () => {
		removeAllQueryParams();
		if (!initialState) {
			return;
		}
		const params = paramsToArray(initialState);
		setQueryParams(params);
	};

	/**
	 * Check if a query param exists
	 * @param key - key of the query param
	 * @returns true if the query param exists, false otherwise
	 *
	 * @example
	 * ```ts
	 * const hasPage = hasQueryParam("page");
	 * ```
	 */
	const hasQueryParam = (key: QueryKey) => {
		if (typeof key === "string") {
			return searchParams.has(key);
		}
		return false;
	};

	/**
	 * Gets a specific query param from the URL.
	 *
	 * @param key - The key of the query param.
	 * @returns The value of the query param.
	 *
	 * @example
	 * ```tsx
	 * const page = getQueryParam("page");
	 * ```
	 */
	const getQueryParam = <T = QueryValue>(key: QueryKey): ToString<T> | null => {
		if (typeof key === "string") {
			return searchParams.get(key) as ToString<T>;
		}
		return null;
	};

	return {
		setQueryParams,
		removeQueryParams,
		removeAllQueryParams,
		hasQueryParam,
		/**
		 * Search params from the URL
		 *
		 * **NOT TYPED** - If you want to get a specific param, use `getQueryParam` instead.
		 */
		queryParams: searchParams,
		getQueryParam,
		resetToInitialState,
	};
};
