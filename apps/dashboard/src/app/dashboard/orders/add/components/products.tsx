import { getProductsByLocation } from "@kristall/core/products/get";

import { ProductItem } from "./product-item";
import { ProductsView } from "./products-view";

export async function Products({
	searchParams,
}: { searchParams: Promise<Readonly<URLSearchParams>> }) {
	const params = new URLSearchParams(await searchParams);
	const location = params.get("location") ?? "";
	const name = params.get("name") ?? "";

	const products = await getProductsByLocation({ locationId: location, name });

	if (!products || products.length === 0) {
		return <div>No products found</div>;
	}

	return (
		<ProductsView>
			{products?.map((product) => (
				<ProductItem product={product} key={product._id} />
			))}
		</ProductsView>
	);
}
