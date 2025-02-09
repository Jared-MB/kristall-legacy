import { getPaginatedProducts } from "@kristall/core/products/get";
import { columns } from "@kristall/ui/compound/products/table/columns";
import {
	DataTable,
	DataTableSkeleton,
} from "@kristall/ui/compound/products/table/data-table";
import { Suspense } from "react";

export async function ProductsTable({
	searchParams,
}: { searchParams: Promise<URLSearchParams> }) {
	const params = await searchParams;
	const data = await getPaginatedProducts(params);

	return <DataTable columns={columns} data={data.entities} pagination={data} />;
}

export function ProductsTableSkeleton() {
	return (
		<Suspense>
			<DataTableSkeleton columns={columns} />
		</Suspense>
	);
}
