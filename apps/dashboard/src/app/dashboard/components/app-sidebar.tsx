import { Kristall } from "@/components/kristall";
import { Sidebar, SidebarHeader } from "@kristall/ui/sidebar";

import { AppSidebarFooter } from "./app-sidebar-footer";
import { AppSidebarNavigation } from "./app-sidebar-navigation";

export function AppSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Kristall />
			</SidebarHeader>
			<AppSidebarNavigation />
			<AppSidebarFooter />
		</Sidebar>
	);
}
