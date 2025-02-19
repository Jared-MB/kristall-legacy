import { Kristall } from "@/components/kristall";
import { ThemeSwitch } from "@/components/theme-switch";
import { logout } from "@kristall/core/auth/logout";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@kristall/ui/dropdown-menu";
import {
	Sidebar,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@kristall/ui/sidebar";
import { Skeleton } from "@kristall/ui/skeleton";
import { ChevronUp, LogOut } from "lucide-react";
import { Suspense } from "react";
import { AppSidebarNavigation } from "./app-sidebar-navigation";
import { AppSidebarUser } from "./app-sidebar-user";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Kristall />
			</SidebarHeader>
			<AppSidebarNavigation />
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton className="h-12">
									<Suspense fallback={<Skeleton className="w-full h-full" />}>
										<AppSidebarUser />
									</Suspense>
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]"
							>
								<DropdownMenuGroup>
									<ThemeSwitch />
									<DropdownMenuItem className="flex items-center gap-x-2">
										<form action={logout}>
											<button
												type="submit"
												className="flex items-center gap-x-2"
											>
												<LogOut className="w-5 h-5" />
												Cerrar sesión
											</button>
										</form>
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
