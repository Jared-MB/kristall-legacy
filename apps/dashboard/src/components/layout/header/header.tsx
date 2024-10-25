import { Suspense } from "react";
import BreadcrumbNavigation from "./breadcrumb-navigation";
import Menu from "./menu";
import ShopName, { ShopNameSkeleton } from "./shop-name";

export default function Header() {
	return (
		<header className="border-b border-b-zinc-700 flex justify-between items-center px-4 print:hidden w-full">
			<div className="flex flex-row items-center gap-x-4">
				<h2 className="text-2xl">
					<Suspense fallback={<ShopNameSkeleton />}>
						<ShopName />
					</Suspense>
				</h2>
				<span>|</span>
				<BreadcrumbNavigation />
			</div>
			<Menu />
		</header>
	);
}
