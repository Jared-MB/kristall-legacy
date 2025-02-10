import { Suspense } from "react";
import { LocationsFilter } from "./components/locations-filter";
import Menu from "./components/menu";
import {
	ProductsTable,
	ProductsTableSkeleton,
} from "./components/products-table";
import { SearchProduct } from "./components/search-product";

import { MainContent } from "@kristall/ui/layout/main-content";
import { InventoryRoutesPrefetch } from "./components/inventory-routes-prefetch";
import { MenuShortcut } from "./components/menu/menu-shortcut";

export default async function InventoryPage(props: {
	searchParams: Promise<URLSearchParams>;
}) {
	return (
		<MainContent className="flex flex-col gap-y-4">
			<InventoryRoutesPrefetch />
			<MenuShortcut />
			<header className="flex flex-row items-center justify-end gap-x-4">
				<SearchProduct />
				<Suspense fallback={null}>
					<LocationsFilter />
				</Suspense>
				<Menu />
			</header>
			<Suspense fallback={<ProductsTableSkeleton />}>
				<ProductsTable searchParams={props.searchParams} />
			</Suspense>
		</MainContent>
	);
}
