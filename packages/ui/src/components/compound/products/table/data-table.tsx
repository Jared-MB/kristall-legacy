"use client";

import type { Pagination } from "@kristall/http/interfaces";

import {
	type ColumnDef,
	type Table as RTable,
	type SortingState,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	useReactTable,
} from "@tanstack/react-table";

import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../../../ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../../../ui/table";

import { Skeleton } from "@/components/ui/skeleton";
import { useQueryParams } from "@kristall/core/hooks/use-query-params";
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
	pagination?: Pagination<TValue>;
}

export function DataTable<TData, TValue>({
	columns,
	data,
	pagination,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);

	const { setQueryParams, queryParams } = useQueryParams();

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
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		pageCount: pagination?.totalPages ?? 0,
		manualPagination: true,
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		initialState: {
			pagination: {
				pageIndex: pagination?.page ? pagination.page - 1 : 0,
				pageSize: 7,
			},
			sorting,
		},
	});

	const router = useRouter();

	const currentPage = useMemo(
		() => table.getState().pagination.pageIndex + 1,
		[table.getState()],
	);
	const pageCount = table.getPageCount();

	const prefetch = useCallback(
		(pages: number[]) => {
			for (const page of pages) {
				const query = new URLSearchParams(queryParams);
				query.set("page", page.toString());
				router.prefetch(`/dashboard/inventory?${query.toString()}`);
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
		<section className="flex flex-col gap-y-2 grow">
			<RenderTable table={table} />
			<div className="flex items-center justify-center">
				<div className="flex items-center gap-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={onFirstPageClick}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={onPreviousPageClick}
						disabled={!table.getCanPreviousPage()}
					>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Página {table.getState().pagination.pageIndex + 1} de{" "}
						{table.getPageCount()}
					</div>
					<Button
						variant="outline"
						className="h-8 w-8 p-0"
						onClick={onNextPageClick}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						onClick={onLastPageClick}
						disabled={!table.getCanNextPage()}
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</section>
	);
}

interface RenderTableProps<TData> {
	table: RTable<TData>;
}

function RenderTable<TData>({ table }: RenderTableProps<TData>) {
	return (
		<Table growContainer>
			<TableHeader>
				{table.getHeaderGroups().map((headerGroup) => (
					<TableRow key={headerGroup.id}>
						{headerGroup.headers.map((header) => {
							return (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
								</TableHead>
							);
						})}
					</TableRow>
				))}
			</TableHeader>
			<TableBody>
				{table.getRowModel().rows?.length ? (
					table.getRowModel().rows.map((row) => (
						<TableRow
							key={row.id}
							data-state={row.getIsSelected() && "selected"}
						>
							{row.getVisibleCells().map((cell) => (
								<TableCell key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</TableCell>
							))}
						</TableRow>
					))
				) : (
					<TableRow>
						<TableCell
							colSpan={table.getAllColumns().length}
							className="h-24 text-center"
						>
							No se encontraron resultados.
						</TableCell>
					</TableRow>
				)}
			</TableBody>
		</Table>
	);
}

interface DataTableSkeletonProps<TData, TValue>
	extends Pick<DataTableProps<TData, TValue>, "columns"> {
	elements?: number;
}

export function DataTableSkeleton<TData, TValue>({
	columns,
	elements = 6,
}: DataTableSkeletonProps<TData, TValue>) {
	const table = useReactTable({
		data: Array.from({ length: elements }).fill({
			_id: Math.random(),
		}) as TData[],
		columns,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true,
	});

	return (
		<section className="flex flex-col gap-y-2 grow">
			<RenderTable table={table} />
			<div className="flex items-center justify-center">
				<div className="flex items-center gap-x-2">
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						disabled
					>
						<span className="sr-only">Go to first page</span>
						<ChevronsLeft />
					</Button>
					<Button variant="outline" className="h-8 w-8 p-0" disabled>
						<span className="sr-only">Go to previous page</span>
						<ChevronLeft />
					</Button>
					<div className="flex w-[100px] items-center justify-center text-sm font-medium">
						Página <Skeleton className="w-12 h-5 mx-1" /> de{" "}
						<Skeleton className="w-12 h-5 mx-1" />
					</div>
					<Button variant="outline" className="h-8 w-8 p-0" disabled>
						<span className="sr-only">Go to next page</span>
						<ChevronRight />
					</Button>
					<Button
						variant="outline"
						className="hidden h-8 w-8 p-0 lg:flex"
						disabled
					>
						<span className="sr-only">Go to last page</span>
						<ChevronsRight />
					</Button>
				</div>
			</div>
		</section>
	);
}
