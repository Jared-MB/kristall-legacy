import { MenuLink } from "@/components/nav-link";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Shapes, Upload } from "lucide-react";

import InventoryCut from "./inventory-cut";
import MenuShortcut from "./menu-shortcut";
import PrintLocations from "./print-locations";

export default function Menu() {
	return (
		<DropdownMenu>
			<MenuShortcut />
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<MoreVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem>
						<MenuLink href="/dashboard/inventory/add" icon={<Upload />}>
							Crear producto
							<DropdownMenuShortcut>C</DropdownMenuShortcut>
						</MenuLink>
					</DropdownMenuItem>
					<DropdownMenuItem>
						<MenuLink href="/dashboard/inventory/categories" icon={<Shapes />}>
							Ver categorías
						</MenuLink>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem asChild>
						<PrintLocations />
					</DropdownMenuItem>
					<DropdownMenuItem asChild>
						<InventoryCut />
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
