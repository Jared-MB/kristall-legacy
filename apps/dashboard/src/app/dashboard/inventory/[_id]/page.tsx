import { getCategories } from "@kristall/core/categories/all";
import { getBatchesFromLocations } from "@kristall/core/locations/utils/locations-to-batches";
import { settings } from "@kristall/core/modules/settings";
import { getProductById } from "@kristall/core/products/id";

import { MainContent } from "@kristall/ui/layout/main-content";
import { InventoryHeader } from "../components/inventory-form/inventory-header";
import { BatchesProvider } from "../context/batch-context";
import { LocationsToAddProvider } from "../context/location-context";
import ProductForm from "./components/product-form";
import SaveRemember from "./components/save-remember";

export default async function ProductIdPage(props: {
	params: Promise<{
		_id: string;
	}>;
}) {
	const params = await props.params;

	const [product, categories, userSettings] = await Promise.all([
		getProductById(params._id),
		getCategories(),
		settings.getDefaultBatchEnabled(),
	]);

	const { defaultBatchEnabled } = userSettings;
	const hasEnableBatches = Boolean(product.batchEnabled);
	const defaultBatches = getBatchesFromLocations(product.locations);

	if (!product) return <div>Product not found</div>;
	if (!categories) return <div>Categories not found</div>;

	return (
		<MainContent>
			<InventoryHeader productName={product.name} />
			<LocationsToAddProvider value={product.locations}>
				<BatchesProvider
					value={{
						batches: defaultBatches,
						isEnabled: hasEnableBatches,
						defaultBatchEnabled,
					}}
				>
					<ProductForm product={product} categories={categories} />
				</BatchesProvider>
			</LocationsToAddProvider>
			<SaveRemember />
		</MainContent>
	);
}
