import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
	onFirstPageClick: () => void;
	onLastPageClick: () => void;
	onNextPageClick: () => void;
	onPreviousPageClick: () => void;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
}

export function Pagination(props: PaginationProps) {
	return (
		<div className="flex items-center justify-center w-full">
			<div className="flex items-center gap-x-2">
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={props.onFirstPageClick}
					disabled={!props.hasPreviousPage}
				>
					<span className="sr-only">Go to first page</span>
					<ChevronsLeft />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={props.onPreviousPageClick}
					disabled={!props.hasPreviousPage}
				>
					<span className="sr-only">Go to previous page</span>
					<ChevronLeft />
				</Button>
				<div className="flex w-[100px] items-center justify-center text-sm font-medium">
					Página {props.currentPage} de {props.totalPages}
				</div>
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={props.onNextPageClick}
					disabled={!props.hasNextPage}
				>
					<span className="sr-only">Go to next page</span>
					<ChevronRight />
				</Button>
				<Button
					variant="outline"
					className="hidden h-8 w-8 p-0 lg:flex"
					onClick={props.onLastPageClick}
					disabled={!props.hasNextPage}
				>
					<span className="sr-only">Go to last page</span>
					<ChevronsRight />
				</Button>
			</div>
		</div>
	);
}
