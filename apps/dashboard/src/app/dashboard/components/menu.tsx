"use client";

import { logout } from "@/actions/auth.actions";
import { ThemeSwitch } from "@/components/theme-switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	BookText,
	ClipboardList,
	HandCoins,
	LayoutDashboard,
	LogOut,
	MapPinned,
	Package,
	ReceiptText,
	Settings,
	ShoppingBasket,
	Users,
} from "lucide-react";
import Link from "next/link";

export default function Menu({
	logo,
	username,
}: {
	logo: string;
	username: string;
}) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Avatar>
					<AvatarImage src={logo} alt="Kristall" />
					<AvatarFallback>{username[0]}</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>{username}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup className="block lg:hidden">
					<DropdownMenuItem>
						<Link href="/dashboard" className="flex items-center gap-x-2">
							<LayoutDashboard className="h-5 w-5" />
							Dashboard
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/dashboard/sales" className="flex items-center gap-x-2">
							<ShoppingBasket className="h-5 w-5" />
							Ventas
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/dashboard/inventory"
							className="flex items-center gap-x-2"
						>
							<Package className="h-5 w-5" />
							Inventario
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/dashboard/locations"
							className="flex items-center gap-x-2"
						>
							<MapPinned className="h-5 w-5" />
							Ubicaciones
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/dashboard/orders"
							className="flex items-center gap-x-2"
						>
							<ClipboardList className="h-5 w-5" />
							Pedidos
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/dashboard/customers"
							className="flex items-center gap-x-2"
						>
							<Users className="h-5 w-5" />
							Clientes
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/dashboard/notes" className="flex items-center gap-x-2">
							<ReceiptText className="h-5 w-5" />
							Notas
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link
							href="/dashboard/expenses"
							className="flex items-center gap-x-2"
						>
							<HandCoins className="h-5 w-5" />
							Gastos
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<Link href="/dashboard/users" className="flex items-center gap-x-2">
							<Users className="h-5 w-5" />
							Usuarios
						</Link>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator className="block lg:hidden" />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<Link
							href="/dashboard/settings"
							className="flex items-center gap-x-2"
						>
							<Settings className="h-5 w-5" />
							Configuración
						</Link>
					</DropdownMenuItem>
					<ThemeSwitch />
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<Link href="/docs" className="flex items-center gap-x-2">
							<BookText className="h-5 w-5" />
							Documentación
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem className="flex items-center gap-x-2">
						<form action={logout}>
							<button type="submit" className="flex items-center gap-x-2">
								<LogOut className="w-5 h-5" />
								Cerrar sesión
							</button>
						</form>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
