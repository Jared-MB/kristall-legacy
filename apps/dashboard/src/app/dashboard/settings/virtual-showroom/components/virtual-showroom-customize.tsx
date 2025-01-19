import type { VirtualShowroom } from "@kristall/core/interfaces/virtual-showroom";
import {
	getPublicBestSellersProducts,
	getPublicNewestProducts,
} from "@kristall/core/products/public";
import { getShopData } from "@kristall/core/shop/data";
import Customize from "./customize";

export async function VirtualShowroomCustomize({
	virtualShowroom,
}: { virtualShowroom: VirtualShowroom }) {
	const { shopName } = await getShopData();

	const bestSellersPromise = getPublicBestSellersProducts(
		shopName.toLowerCase(),
	);
	const newProductsPromise = getPublicNewestProducts(shopName.toLowerCase());

	const [bestSellers, newProducts] = await Promise.all([
		bestSellersPromise,
		newProductsPromise,
	]);

	if (!bestSellers?.entities || !newProducts?.entities) {
		return null;
	}

	return (
		<Customize
			{...virtualShowroom}
			products={bestSellers.entities}
			newProducts={newProducts.entities}
			name={shopName}
		/>
	);
}
