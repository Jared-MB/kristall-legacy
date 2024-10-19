"use client";

import { Button } from "@/components/ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function TablePagination({
	page,
	totalPages,
}: {
	page: number;
	totalPages: number;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handlePageChange = (newPage: number) => {
		const params = new URLSearchParams(searchParams.toString());
		params.set("page", newPage.toString());
		replace(`${pathname}?${params.toString()}`);
	};

	useEffect(() => {
		const params = new URLSearchParams(searchParams.toString());
		if (!params.get("page")) {
			params.set("page", page.toString());
			replace(`${pathname}?${params.toString()}`);
		}
	}, []);

	return (
		<footer className="flex items-center justify-center gap-x-4">
			<div className="flex flex-row gap-x-2">
				Página
				<span>{totalPages === 0 ? 0 : page}</span>
				de
				<span>{totalPages}</span>
			</div>
			<Pagination className="w-fit mx-0">
				<PaginationContent>
					<PaginationItem>
						<Button
							disabled={page === 1}
							className="w-fit px-2 py-1"
							variant="ghost"
							onClick={() => handlePageChange(page - 1)}
						>
							<PaginationPrevious href="#" />
						</Button>
					</PaginationItem>
					<PaginationItem>
						<Button
							disabled={page === totalPages || totalPages === 0}
							className="w-fit px-2 py-1"
							variant="ghost"
							onClick={() => handlePageChange(page + 1)}
						>
							<PaginationNext href="#" />
						</Button>
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</footer>
	);
}
