import Link from "next/link";
import { Suspense } from "react";

import {
	DropdownMenu,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@kristall/ui/dropdown-menu";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@kristall/ui/sidebar";
import { Skeleton } from "@kristall/ui/skeleton";
import { ChevronUp, CreditCard, LogOut, UserCircle } from "lucide-react";
import { AppSidebarFooterMenu } from "./app-sidebar-footer-menu";
import { AppSidebarUser } from "./app-sidebar-user";

export function AppSidebarFooter() {
	return (
		<SidebarFooter>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Suspense fallback={<Skeleton className="w-full h-full" />}>
									<AppSidebarUser />
								</Suspense>
								<ChevronUp className="ml-auto" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<AppSidebarFooterMenu>
							<DropdownMenuLabel className="p-0 font-normal">
								<Suspense fallback={<Skeleton className="w-full h-full" />}>
									<AppSidebarUser />
								</Suspense>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<Link href="/dashboard/settings/profile">
										<UserCircle />
										Perfil
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/dashboard/settings/subscription">
										<CreditCard />
										Suscripción
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/login">
									<LogOut />
									Cerrar sesión
								</Link>
							</DropdownMenuItem>
						</AppSidebarFooterMenu>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
