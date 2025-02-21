import { getShopData } from "@kristall/core/shop/data";
import { Avatar, AvatarFallback, AvatarImage } from "@kristall/ui/avatar";

export async function AppSidebarUser() {
	const { logo, username, shopName } = await getShopData();

	return (
		<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
			<Avatar className="rounded-lg h-8 w-8">
				<AvatarImage src={logo} alt={shopName} />
				<AvatarFallback className="rounded-lg">{username[0]}</AvatarFallback>
			</Avatar>
			<div className="grid flex-1 text-left text-sm leading-tight">
				<span className="truncate font-semibold">{username}</span>
				{/* <span className="truncate text-xs">{user.email}</span> */}
			</div>
		</div>
	);
}
