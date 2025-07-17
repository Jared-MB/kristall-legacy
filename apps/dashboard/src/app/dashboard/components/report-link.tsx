import { ServerCrash } from "lucide-react";

import { isSuperAdmin } from "@kristall/client/services/user-management/use-cases/private/is-super-admin";

import Routes from "@/constants/routes";
import { SidebarMenuButton, SidebarMenuItem } from "@kristall/ui/sidebar";
import { AppSidebarLink } from "./app-sidebar-link";

export async function ReportLink() {
	const isAdmin = await isSuperAdmin();

	if (!isAdmin) {
		return null;
	}

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild>
				<AppSidebarLink href={Routes.REPORTS}>
					<ServerCrash />
					<span>Reportes</span>
				</AppSidebarLink>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
