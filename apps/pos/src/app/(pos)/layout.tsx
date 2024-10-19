import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getLocations } from "@/core/services/location";
import { getShopImage, getUserShopName } from "@/core/services/shop";
import { ClipboardList } from "lucide-react";
import Link from "next/link";
import ProfileMenu from "./components/profile-menu";
import SelectLocation from "./components/select-location";

export default async function POSLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const userShop = await getUserShopName();
	const locations = await getLocations();

	const image = await getShopImage();

	return (
		<div className="flex flex-col">
			<header className="h-16 flex justify-between items-center px-8 border-b dark:border-b-zinc-700">
				<section className="flex items-center gap-x-8 h-16">
					<h1>
						<Link
							href="https://kristall.app"
							className="text-purple-500 text-4xl"
						>
							Kristall
						</Link>
					</h1>
					<Separator
						className="darK:bg-zinc-300 rounded h-[40%]"
						orientation="vertical"
					/>
					<h2 className="text-xl">
						<Link href="/">{userShop}</Link>
					</h2>
				</section>
				<section className="flex items-center gap-x-8">
					<Button variant="outline" asChild>
						<Link href="/orders">
							<ClipboardList className="pr-2" /> Pedidos
						</Link>
					</Button>
					<SelectLocation locations={locations} />
					<ProfileMenu name={userShop} url={image} />
				</section>
			</header>
			{children}
		</div>
	);
}
