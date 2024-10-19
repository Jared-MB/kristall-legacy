"use client";

import { LogOut } from "lucide-react";

import { logout } from "@/core/services/auth";

import { ThemeSwitch } from "@/components/providers/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function ProfileMenu({
	name,
	url,
}: {
	name: string;
	url: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={url} />
					<AvatarFallback>{name[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Perfil</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<ThemeSwitch />
				<DropdownMenuSeparator />
				<DropdownMenuItem>
					<form action={logout} className="w-full">
						<button type="submit" className="flex items-center gap-x-2 w-full">
							<LogOut className="w-5 h-5" />
							Cerrar sesión
						</button>
					</form>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
