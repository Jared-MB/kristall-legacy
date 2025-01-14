"use client";

interface PaginationProps {
	page: number;
	totalPages: number;
	hasMore: boolean;
	previous: number | null;
}

import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import { Pagination } from "@kristall/ui/functional/pagination";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export function ProductsPagination({
	page,
	totalPages,
	hasMore,
	previous,
}: PaginationProps) {
	const { setQueryParams, queryParams } = useQueryParams<"page">();

	const goToFirstPage = () => setQueryParams("page", 1);
	const goToLastPage = () => setQueryParams("page", totalPages);

	const goToNextPage = () => setQueryParams("page", page + 1);
	const goToPreviousPage = () => setQueryParams("page", page - 1);

	const router = useRouter();
	const pathname = usePathname();

	console.log(pathname);

	const prefetch = useCallback(
		(pages: number[]) => {
			for (const page of pages) {
				const query = new URLSearchParams(queryParams);
				query.set("page", page.toString());
				router.prefetch(`${pathname}?${query.toString()}`);
			}
		},
		[queryParams],
	);

	useEffect(() => {
		if (page === 1) {
			prefetch([page + 1]);
		} else if (page === totalPages) {
			prefetch([page - 1]);
		} else {
			prefetch([page - 1, page + 1]);
		}
	}, [totalPages, prefetch]);

	useEffect(() => {
		prefetch([1, 2]);
	}, []);

	return (
		<Pagination
			currentPage={page}
			totalPages={totalPages}
			hasNextPage={hasMore}
			hasPreviousPage={previous !== null}
			onFirstPageClick={goToFirstPage}
			onLastPageClick={goToLastPage}
			onNextPageClick={goToNextPage}
			onPreviousPageClick={goToPreviousPage}
		/>
	);
}
