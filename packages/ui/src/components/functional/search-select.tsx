"use client";

import type { SelectProps } from "@radix-ui/react-select";
import { useEffect, useState } from "react";
import { Select } from "../ui/select";

import { isDev } from "@kristall/ui/core/utils";

import { useQueryParams } from "@kristall/core/hooks/use-query-params";

interface SearchSelectProps extends SelectProps {
	clearOnValue?: string;
}

export function SearchSelect({
	clearOnValue = "",
	...props
}: SearchSelectProps) {
	const { setQueryParams, removeQueryParams, queryParams } = useQueryParams();

	const [value, setValue] = useState(
		queryParams.get(props.name ?? "") ?? props.value,
	);

	useEffect(() => {
		if (!props.name) {
			isDev && console.error("⚠️ SearchSelect: name prop is required");
		} else if (value && clearOnValue !== value) {
			setQueryParams(props.name, value);
		} else if (!value || clearOnValue === value) {
			removeQueryParams(props.name);
		}
	}, [value]);

	useEffect(() => {
		if (props.defaultValue && props.name) {
			setQueryParams(props.name, props.defaultValue);
		}
	}, [props.defaultValue]);

	return (
		<Select {...props} value={value} onValueChange={(e) => setValue(e)}>
			{props.children}
		</Select>
	);
}
