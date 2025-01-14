import { Search } from "@kristall/ui/functional/search";

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
} from "@kristall/ui/sidebar";
import { Suspense } from "react";
import {
	CategoriesFilter,
	CategoriesFilterSkeleton,
} from "./categories-filter";
import { ClearFilters } from "./clear-filters";
import { OrderByFilter } from "./order-by-filter";

export function ProductsSidebar({ shopName }: { shopName: string }) {
	return (
		<Sidebar className="h-[calc(100dvh-4rem)] top-16">
			<SidebarHeader>
				<Search queryName="name" />
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Categorías</SidebarGroupLabel>
					<Suspense fallback={<CategoriesFilterSkeleton />}>
						<CategoriesFilter shopName={shopName} />
					</Suspense>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarGroupLabel>Ordenar por</SidebarGroupLabel>
					<Suspense>
						<OrderByFilter />
					</Suspense>
				</SidebarGroup>
				<SidebarGroup>
					<Suspense>
						<ClearFilters />
					</Suspense>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
