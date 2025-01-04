import Routes from "@/constants/routes";
import { shop } from "@kristall/core/modules/shop";
import { SidebarMenuButton, SidebarMenuItem } from "@kristall/ui/sidebar";
import { Users } from "lucide-react";
import Link from "next/link";

export async function ReportLink() {
	const isAdmin = await shop.isAdmin();

	if (!isAdmin) {
		return null;
	}

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild>
				<Link href={Routes.REPORTS}>
					<Users />
					<span>Reportes</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
