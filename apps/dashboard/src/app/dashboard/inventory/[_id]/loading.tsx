import { MainContent } from "@kristall/ui/layout/main-content";
import ProductForm from "./components/product-form";

export default function ProductIdLoading() {
	return (
		<MainContent>
			<ProductForm
				loading
				product={
					{
						name: "Loading...",
					} as any
				}
				categories={[]}
			/>
		</MainContent>
	);
}
