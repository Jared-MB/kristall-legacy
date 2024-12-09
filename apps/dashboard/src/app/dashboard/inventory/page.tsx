import Search from "@/components/search";

import { Suspense } from "react";
import LocationsFilter from "./components/locations-filter";
import Menu from "./components/menu";
import ProductsTable from "./components/products-table";
import ProductsTableSkeleton from "./components/products-table/skeleton";

export default async function InventoryPage(props: {
	searchParams: Promise<URLSearchParams>;
}) {
	const searchParams = await props.searchParams;
	return (
		<main>
			<header className="flex flex-row items-center justify-end p-4 gap-x-4">
				<Search showLabel={false} queryName="name" />
				<LocationsFilter />
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
