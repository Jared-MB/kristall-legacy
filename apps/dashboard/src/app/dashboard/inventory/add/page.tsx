import { getCategories } from "@/actions/category.actions";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { settings } from "@kristall/core/modules/settings";
import { BatchesProvider } from "../context/batch-context";
import { LocationsToAddProvider } from "../context/location-context";
import AddProductForm from "./components/add-product-form";

export default async function ProductIdPage() {
	const categories = await getCategories();
	const { defaultBatchEnabled } = await settings.getDefaultBatchEnabled();

	if (!categories) return <div>Categories not found</div>;

	return (
		<main className="p-8 overflow-y-scroll h-layout">
			<Card variant="container" className="mb-4">
				<CardHeader className="p-0">
					<CardTitle>Agregar producto</CardTitle>
					<CardDescription>
						Completa los campos para agregar un nuevo producto a tu inventario.
						Los campos marcados con * son obligatorios
					</CardDescription>
				</CardHeader>
			</Card>
			<LocationsToAddProvider>
				<BatchesProvider value={{ defaultBatchEnabled }}>
					<AddProductForm categories={categories} />
				</BatchesProvider>
			</LocationsToAddProvider>
		</main>
	);
}
