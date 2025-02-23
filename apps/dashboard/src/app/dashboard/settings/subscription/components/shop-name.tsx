import { getShopData } from "@kristall/core/shop/data";
import { CardTitle } from "@kristall/ui/card";
import { Skeleton } from "@kristall/ui/skeleton";

export async function ShopName() {
	const { shopName } = await getShopData();

	return (
		<CardTitle className="text-3xl font-medium text-purple-400">
			{shopName}
		</CardTitle>
	);
}

export function ShopNameSkeleton() {
	return (
		<CardTitle>
			<Skeleton className="h-4 w-32" />
		</CardTitle>
	);
}
