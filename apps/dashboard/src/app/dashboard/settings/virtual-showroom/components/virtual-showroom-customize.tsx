import type { VirtualShowroom } from "@kristall/core/interfaces/virtual-showroom";
import {
	getPublicBestSellers,
	getPublicNewProducts,
} from "@kristall/core/products/public";
import { getShopData } from "@kristall/core/shop/data";
import Customize from "./customize";

export async function VirtualShowroomCustomize({
	virtualShowroom,
}: { virtualShowroom: VirtualShowroom }) {
	const bestSellersPromise = getPublicBestSellers(virtualShowroom.url);
	const newProductsPromise = getPublicNewProducts(virtualShowroom.url);
	const shopPromise = getShopData();

	const [bestSellers, newProducts, shop] = await Promise.all([
		bestSellersPromise,
		newProductsPromise,
		shopPromise,
	]);

	return (
		<Customize
			{...virtualShowroom}
			products={bestSellers}
			newProducts={newProducts}
			name={shop.shopName}
		/>
	);
}
