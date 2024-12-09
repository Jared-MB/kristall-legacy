import Svg from "@/components/svg";
import AddNote from "@/components/svg/add-note";
import TablePagination from "@/components/table-pagination";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { products } from "@kristall/core/modules/products";
import { Suspense } from "react";
import ProductRow from "./components/product-row";

export default async function ProductsTable({
	searchParams,
}: { searchParams: URLSearchParams }) {
	const data = await products.getPaginatedProducts(searchParams);

	if (!data) return <div>Products not found</div>;

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
					{data.entities.length > 0 ? (
						data.entities.map((product) => (
							<ProductRow key={product._id} product={product} />
						))
					) : (
						<TableRow key="no-products">
							<TableCell colSpan={5} className="text-center">
								<div className="flex flex-col items-center gap-y-4 py-4">
									<Svg className="w-56">
										<AddNote />
									</Svg>
									<span className="text-zinc-400 text-lg">
										Aún no hay productos, ¡crea uno para comenzar!
									</span>
								</div>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
			<Suspense>
				<TablePagination page={data.page} totalPages={data.totalPages} />
			</Suspense>
		</>
	);
}
