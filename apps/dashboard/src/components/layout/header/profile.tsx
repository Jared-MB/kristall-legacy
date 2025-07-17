import { getShopData } from "@kristall/client/services/store-management/use-cases/private/get-shop-data";
import { Avatar, AvatarFallback, AvatarImage } from "@kristall/ui/avatar";
import { DropdownMenuLabel } from "@kristall/ui/dropdown-menu";
import { Skeleton } from "@kristall/ui/skeleton";

export async function ProfilePicture() {
	const { logo, username } = await getShopData();

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
	const { username } = await getShopData();

	return <DropdownMenuLabel>{username}</DropdownMenuLabel>;
}

export async function ProfileUsernameSkeleton() {
	return (
		<DropdownMenuLabel>
			<Skeleton className="w-24 h-5" />
		</DropdownMenuLabel>
	);
}
