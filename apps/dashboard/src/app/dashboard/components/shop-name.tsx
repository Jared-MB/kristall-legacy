import { shop } from "@kristall/core/modules/shop";
import { Skeleton } from "@kristall/ui/skeleton";

export default async function ShopName() {
	const { shopName } = await shop.getShopData();

	return <>{shopName}</>;
}

export const ShopNameSkeleton = () => {
	return <Skeleton className="w-24 h-6" />;
};
