import Menu from "./components/menu";
import { ProductsTableSkeleton } from "./components/products-table";
import { SearchProduct } from "./components/search-product";

import { MainContent } from "@kristall/ui/layout/main-content";

export default function InventoryLoading() {
  return (
    <MainContent className="flex flex-col gap-y-4">
      <header className="flex flex-row items-center justify-end gap-x-4">
        <SearchProduct />
        {/*<Suspense fallback={null}>
					<LocationsFilterWrapper locations={locations} />
				</Suspense>*/}
        <Menu />
      </header>
      <ProductsTableSkeleton />
    </MainContent>
  );
}
