import TablePagination from "@/components/table-pagination";
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui";
import { ProductRowSkeleton } from "./components/product-row";

export default function ProductsTableSkeleton() {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="hidden md:block" />
						<TableHead>Nombre</TableHead>
						<TableHead>Precio</TableHead>
						<TableHead>Stock</TableHead>
						<TableHead />
					</TableRow>
				</TableHeader>
				<TableBody>
					{[1, 2, 3, 4, 5, 6, 7].map((index) => (
						<ProductRowSkeleton key={Math.random() * index} />
					))}
				</TableBody>
			</Table>
			<TablePagination page={1} totalPages={1} />
		</>
	);
}
