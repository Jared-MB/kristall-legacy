import { Suspense } from "react";
import LocationsFilter from "./components/locations-filter";
import Menu from "./components/menu";
import ProductsTable from "./components/products-table";
import ProductsTableSkeleton from "./components/products-table/skeleton";
import { SearchProduct } from "./components/search-product";

import { MainContent } from "@kristall/ui/layout/main-content";

export default async function InventoryPage(props: {
	searchParams: Promise<URLSearchParams>;
}) {
	const searchParams = await props.searchParams;
	return (
		<MainContent>
			<header className="flex flex-row items-center justify-end gap-x-4 mb-4">
				<SearchProduct />
				<LocationsFilter />
				<Menu />
			</header>
			<section>
				<Suspense fallback={<ProductsTableSkeleton />}>
					<ProductsTable searchParams={searchParams} />
				</Suspense>
			</section>
		</MainContent>
	);
}
