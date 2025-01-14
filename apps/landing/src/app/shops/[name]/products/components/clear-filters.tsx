"use client";

import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import { Button } from "@kristall/ui/button";

export function ClearFilters() {
	const { removeAllQueryParams } = useQueryParams();

	return <Button onClick={removeAllQueryParams}>Limpiar filtros</Button>;
}
