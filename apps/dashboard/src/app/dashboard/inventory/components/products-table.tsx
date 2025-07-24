import { getPaginatedProducts } from "@kristall/client/services/product-catalog/use-cases/private/get-paginated-products";

import {
	columns,
	skeletonColumns,
} from "@kristall/ui/compound/products/table/columns";
import {
	DataTable,
	DataTableSkeleton,
} from "@kristall/ui/compound/products/table/data-table";

export async function ProductsTable({
	searchParams,
}: { searchParams: Promise<URLSearchParams> }) {
	const params = await searchParams;
	const data = await getPaginatedProducts(params);

	return <DataTable columns={columns} data={data.entities} pagination={data} />;
}

export function ProductsTableSkeleton() {
	return <DataTableSkeleton columns={skeletonColumns} />;
}
