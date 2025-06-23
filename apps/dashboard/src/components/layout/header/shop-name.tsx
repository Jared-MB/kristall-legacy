import { getShopData } from "@kristall/core/shop/data";
import { Skeleton } from "@kristall/ui/skeleton";
import Link from "next/link";

export async function ShopName() {
	const { shopName } = await getShopData();

	return <Link href="/dashboard">{shopName}</Link>;
}

export const ShopNameSkeleton = () => {
	return <Skeleton className="w-24 h-6" />;
};
