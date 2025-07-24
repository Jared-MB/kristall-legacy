import type { Location } from "@kristall/shared/domains/location-services/types";

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

import { getLocations } from "@kristall/client/services/location-services/use-cases/private/get-locations";

export default function InventoryPage(props: {
	searchParams: Promise<URLSearchParams>;
}) {
	const locations = getLocations();
	return (
		<MainContent className="flex flex-col gap-y-4">
			<InventoryRoutesPrefetch />
			<MenuShortcut />
			<header className="flex flex-row items-center justify-end gap-x-4">
				<SearchProduct />
				<Suspense fallback={null}>
					<LocationsFilterWrapper locations={locations} />
				</Suspense>
				<Menu />
			</header>
			<Suspense fallback={<ProductsTableSkeleton />}>
				<ProductsTable searchParams={props.searchParams} />
			</Suspense>
		</MainContent>
	);
}

async function LocationsFilterWrapper({
	locations,
}: { locations: Promise<Location[] | undefined> }) {
	const locationsData = await locations;

	return <LocationsFilter locations={locationsData ?? []} />;
}
