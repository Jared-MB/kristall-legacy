import { Suspense } from "react";
import LocationsFilter from "./components/locations-filter";
import Menu from "./components/menu";
import ProductsTableSkeleton from "./components/products-table/skeleton";
import { SearchProduct } from "./components/search-product";

import { columns } from "@kristall/ui/compound/products/table/columns";
import { DataTable } from "@kristall/ui/compound/products/table/data-table";
import { MainContent } from "@kristall/ui/layout/main-content";
import { InventoryRoutesPrefetch } from "./components/inventory-routes-prefetch";
import { MenuShortcut } from "./components/menu/menu-shortcut";

import { getPaginatedProducts } from "@kristall/core/products/get";

export default async function InventoryPage(props: {
	searchParams: Promise<URLSearchParams>;
}) {
	const searchParams = await props.searchParams;
	const data = await getPaginatedProducts(searchParams);
	return (
		<MainContent className="flex flex-col gap-y-4">
			<InventoryRoutesPrefetch />
			<MenuShortcut />
			<header className="flex flex-row items-center justify-end gap-x-4">
				<SearchProduct />
				<LocationsFilter />
				<Menu />
			</header>
			<Suspense fallback={<ProductsTableSkeleton />}>
				<DataTable columns={columns} data={data.entities} pagination={data} />
			</Suspense>
		</MainContent>
	);
}
