import ProductForm from "./components/product-form";

export default function ProductIdLoading() {
	return (
		<ProductForm
			loading
			product={
				{
					name: "Loading...",
				} as any
			}
			categories={[]}
		/>
	);
}
