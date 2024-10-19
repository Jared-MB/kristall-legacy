import { getCategories } from "@/actions/category.actions";
import { getProductById } from "@/actions/product.actions";
import { getDefaultBatchEnabled } from "@/core/modules/settings";
import type { ProductBatch } from "@/types/batch";
import { BatchesProvider } from "../context/batch-context";
import { LocationsToAddProvider } from "../context/location-context";
import ProductForm from "./components/product-form";

export default async function ProductIdPage({
	params,
}: {
	params: {
		_id: string;
	};
}) {
	const product = await getProductById(params._id);
	const categories = await getCategories();
	const { defaultBatchEnabled } = await getDefaultBatchEnabled();

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
