import { shop } from "@kristall/core/modules/shop";
import { Skeleton } from "@kristall/ui/skeleton";
import Link from "next/link";

export default async function ShopName() {
	const { shopName } = await shop.getShopData();

	return <Link href="/dashboard">{shopName}</Link>;
}

export const ShopNameSkeleton = () => {
	return <Skeleton className="w-24 h-6" />;
};
