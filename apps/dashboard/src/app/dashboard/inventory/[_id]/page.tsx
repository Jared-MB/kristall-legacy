import type { ProductBatch } from "@/types/batch";
import { settings } from "@kristall/core/modules/settings";
import { BatchesProvider } from "../context/batch-context";
import { LocationsToAddProvider } from "../context/location-context";
import ProductForm from "./components/product-form";

import { getCategories } from "@kristall/core/categories/all";
import { getProductById } from "@kristall/core/products/id";

export default async function ProductIdPage(props: {
	params: Promise<{
		_id: string;
	}>;
}) {
	const params = await props.params;
	const product = await getProductById(params._id);
	const categories = await getCategories();
	const { defaultBatchEnabled } = await settings.getDefaultBatchEnabled();

	if (!product) return <div>Product not found</div>;
	if (!categories) return <div>Categories not found</div>;

	return (
		<LocationsToAddProvider value={product.locations}>
			<BatchesProvider
				value={{
					batches: product.batchEnabled
						? (product.locations.flatMap(
								(location) => location.productBatches,
							) as ProductBatch[])
						: [],
					isEnabled: Boolean(product.batchEnabled),
					defaultBatchEnabled,
				}}
			>
				<ProductForm product={product} categories={categories} />
			</BatchesProvider>
		</LocationsToAddProvider>
	);
}
