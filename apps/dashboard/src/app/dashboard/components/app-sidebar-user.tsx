import { getShopData } from "@kristall/core/shop/data";
import { Avatar, AvatarFallback, AvatarImage } from "@kristall/ui/avatar";

export async function AppSidebarUser() {
	const { logo, username, shopName } = await getShopData();

	return (
		<div className="flex items-center gap-x-4">
			<Avatar className="rounded-lg h-8 w-8">
				<AvatarImage src={logo} alt={shopName} />
				<AvatarFallback className="rounded-lg">{username[0]}</AvatarFallback>
			</Avatar>
			<span className="font-medium">{username}</span>
		</div>
	);
}
