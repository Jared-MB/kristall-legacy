"use client";

import { AlignRight, Truck } from "lucide-react";
import Link from "next/link";
import { BsCurrencyDollar } from "react-icons/bs";
import { PiUserCircleFill } from "react-icons/pi";
import { SlLogin } from "react-icons/sl";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavigationMenuItem, NavigationMenuList } from "../ui/navigation-menu";
import { kristallPOS } from "./items";

export default function NavbarMobile() {
	return (
		<NavigationMenuList className="flex md:hidden">
			<NavigationMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<AlignRight className="w-6 h-6" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link
									href="/track-order"
									className="flex flex-row gap-x-2 items-center w-full"
								>
									<Truck className="w-6 h-6" />
									Seguir pedido
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuLabel>Soluciones</DropdownMenuLabel>
							{kristallPOS.map((item) => (
								<DropdownMenuItem
									className="flex items-center flex-row gap-x-2 w-full"
									key={item.href}
								>
									{item.icon}
									{item.title}
								</DropdownMenuItem>
							))}
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Link
									href="/pricing"
									className="flex flex-row items-center gap-x-2 w-full"
								>
									<BsCurrencyDollar className="w-6 h-6" />
									Precios
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href={`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/login`}
									target="_blank"
									className="flex flex-row gap-x-2 w-full items-center"
								>
									<PiUserCircleFill className="w-6 h-6" />
									Iniciar sesión
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Link
									href="/pricing"
									className="flex flex-row gap-x-2 w-full items-center"
								>
									<SlLogin className="w-6 h-6" />
									Registrarse
								</Link>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</NavigationMenuItem>
		</NavigationMenuList>
	);
}
