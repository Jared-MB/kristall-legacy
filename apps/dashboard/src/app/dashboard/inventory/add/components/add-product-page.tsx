import { getCategories } from "@kristall/core/categories/all";
import { settings } from "@kristall/core/modules/settings";

import { MainContent } from "@kristall/ui/layout/main-content";
import { InventoryHeader } from "../../components/inventory-form/inventory-header";
import { BatchesProvider } from "../../context/batch-context";
import { LocationsToAddProvider } from "../../context/location-context";
import AddProductForm from "./add-product-form";

interface Props {
  redirectTo?: `/${string}`;
}

export async function AddProductPage({ redirectTo }: Props) {
  const [allCategories, userSettings] = await Promise.all([
    getCategories(),
    settings.getDefaultBatchEnabled(),
  ]);

  const { defaultBatchEnabled } = userSettings;

  if (!allCategories) return <div>Categories not found</div>;

  return (
    <MainContent>
      <InventoryHeader />
      <LocationsToAddProvider>
        <BatchesProvider value={{ defaultBatchEnabled }}>
          <AddProductForm redirectTo={redirectTo} categories={allCategories} />
        </BatchesProvider>
      </LocationsToAddProvider>
    </MainContent>
  );
}
