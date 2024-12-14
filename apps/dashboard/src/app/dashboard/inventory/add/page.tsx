import { categories } from "@kristall/core/modules/categories";
import { settings } from "@kristall/core/modules/settings";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";

import { MainContent } from "@kristall/ui/layout/main-content";
import { BatchesProvider } from "../context/batch-context";
import { LocationsToAddProvider } from "../context/location-context";
import AddProductForm from "./components/add-product-form";

export default async function AddProductPage() {
	const [allCategories, userSettings] = await Promise.all([
		categories.getCategories(),
		settings.getDefaultBatchEnabled(),
	]);

	const { defaultBatchEnabled } = userSettings;

	if (!allCategories) return <div>Categories not found</div>;

	return (
		<MainContent>
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
					<AddProductForm categories={allCategories} />
				</BatchesProvider>
			</LocationsToAddProvider>
		</MainContent>
	);
}
