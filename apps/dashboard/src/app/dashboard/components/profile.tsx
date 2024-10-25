import { shop } from "@kristall/core/modules/shop";
import { Avatar, AvatarFallback, AvatarImage } from "@kristall/ui/avatar";
import { DropdownMenuLabel } from "@kristall/ui/dropdown-menu";
import { Skeleton } from "@kristall/ui/skeleton";

export async function ProfilePicture() {
	const { logo, username } = await shop.getShopData();

	return (
		<Avatar>
			<AvatarImage src={logo} alt="Kristall" />
			<AvatarFallback>{username[0]}</AvatarFallback>
		</Avatar>
	);
}

export async function ProfilePictureSkeleton() {
	return (
		<Avatar>
			<AvatarFallback>K</AvatarFallback>
		</Avatar>
	);
}

export async function ProfileUsername() {
	const { username } = await shop.getShopData();

	return <DropdownMenuLabel>{username}</DropdownMenuLabel>;
}

export async function ProfileUsernameSkeleton() {
	return (
		<DropdownMenuLabel>
			<Skeleton className="w-24 h-5" />
		</DropdownMenuLabel>
	);
}
