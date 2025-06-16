"use client";

import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import type { PublicProduct } from "@kristall/core/interfaces/products";
import type { Pagination as PG } from "@kristall/http/interfaces";
import { Pagination } from "@kristall/ui/functional/pagination";
import {
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo } from "react";

export function Footer({ pagination }: { pagination: PG<PublicProduct> }) {
	const { setQueryParams, queryParams, getQueryParam } = useQueryParams();

	const onFirstPageClick = () => {
		setQueryParams("page", 1);
		table.setPageIndex(0);
	};

	const onLastPageClick = () => {
		setQueryParams("page", table.getPageCount());
		table.setPageIndex(table.getPageCount() - 1);
	};

	const onNextPageClick = () => {
		setQueryParams("page", table.getState().pagination.pageIndex + 2);
		table.setPageIndex(table.getState().pagination.pageIndex + 1);
	};

	const onPreviousPageClick = () => {
		setQueryParams("page", table.getState().pagination.pageIndex);
		table.setPageIndex(table.getState().pagination.pageIndex - 1);
	};

	const table = useReactTable({
		data: [],
		columns: [],
		getCoreRowModel: getCoreRowModel(),
		pageCount: pagination?.totalPages ?? 0,
		manualPagination: true,
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageIndex: pagination?.page ? pagination.page - 1 : 0,
				pageSize: 7,
			},
		},
	});

	const router = useRouter();

	const currentPage = useMemo(() => {
		const page = Number.parseInt(getQueryParam("page") ?? "1");
		table.setPageIndex(page - 1);
		return page;
	}, [getQueryParam("page")]);

	const pageCount = table.getPageCount();

	const prefetch = useCallback(
		(pages: number[]) => {
			for (const page of pages) {
				const query = new URLSearchParams(queryParams);
				query.set("page", page.toString());
				router.prefetch(`/products?${query.toString()}`);
			}
		},
		[queryParams],
	);

	useEffect(() => {
		if (currentPage === 1) {
			prefetch([currentPage + 1]);
		} else if (currentPage === table.getPageCount()) {
			prefetch([currentPage - 1]);
		} else {
			prefetch([currentPage - 1, currentPage + 1]);
		}
	}, [table.getState(), prefetch, pageCount]);

	useEffect(() => {
		prefetch([1, 2]);
	}, []);

	return (
		<footer className="p-4 grid place-items-center">
			<Pagination
				currentPage={currentPage}
				hasNextPage={table.getCanNextPage()}
				hasPreviousPage={table.getCanPreviousPage()}
				onFirstPageClick={onFirstPageClick}
				onLastPageClick={onLastPageClick}
				onNextPageClick={onNextPageClick}
				onPreviousPageClick={onPreviousPageClick}
				totalPages={table.getPageCount()}
			/>
		</footer>
	);
}
