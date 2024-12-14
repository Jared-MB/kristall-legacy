import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@kristall/ui/card";
import { MainContent } from "@kristall/ui/layout/main-content";
import Products from "./components/products";
import RemoveProducts from "./components/remove-products";
import SaveProducts from "./components/save-products";
import { SearchProduct } from "./components/search-product";
import SelectedLocation from "./components/selected-location";
import { SearchProductContextProvider } from "./context/search-product";

export default function NewInventoryPage() {
	return (
		<MainContent>
			<div className="flex flex-col h-full">
				<Card variant="container" className="mb-4">
					<CardHeader className="p-0 flex-row justify-between items-center">
						<div className="flex flex-col gap-y-1">
							<CardTitle>Agregar nuevo inventario</CardTitle>
							<CardDescription>
								Agrega productos existentes a tu almacén
							</CardDescription>
						</div>
						<div className="flex gap-x-4 items-center">
							<SearchProductContextProvider>
								<SearchProduct />
							</SearchProductContextProvider>
							<SelectedLocation />
						</div>
					</CardHeader>
				</Card>
				<Card className="grow">
					<Products />
					<CardFooter className="justify-between">
						<RemoveProducts />
						<SaveProducts />
					</CardFooter>
				</Card>
			</div>
		</MainContent>
	);
}
