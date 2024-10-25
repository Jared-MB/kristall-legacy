import Search from "@/components/search";

import { Suspense } from "react";
import LocationsFilter from "./components/locations-filter";
import Menu from "./components/menu";
import ProductsTable from "./components/products-table";
import ProductsTableSkeleton from "./components/products-table/skeleton";

export default function InventoryPage({
	searchParams,
}: {
	searchParams: URLSearchParams;
}) {
	return (
		<main>
			<header className="flex flex-row items-center justify-end p-4 gap-x-4">
				<Suspense>
					<Search showLabel={false} queryName="name" />
				</Suspense>
				<Suspense>
					<LocationsFilter />
				</Suspense>
				<Menu />
			</header>
			<section className="px-4">
				<Suspense fallback={<ProductsTableSkeleton />}>
					<ProductsTable searchParams={searchParams} />
				</Suspense>
			</section>
		</main>
	);
}
