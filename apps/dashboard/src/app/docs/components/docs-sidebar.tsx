import { Kristall } from "@/components/kristall";
import VERSIONS from "@/constants/versions";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@kristall/ui/collapsible";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@kristall/ui/sidebar";
import { ChevronDown, CircleHelp } from "lucide-react";
import Link from "next/link";

export function DocsSidebar() {
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<Kristall />
			</SidebarHeader>
			<SidebarContent>
				<Collapsible defaultOpen className="group/collapsible">
					<SidebarGroup>
						<SidebarGroupLabel asChild>
							<CollapsibleTrigger className="hover:bg-sidebar-accent !text-sm">
								Versiones
								<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
							</CollapsibleTrigger>
						</SidebarGroupLabel>
						<CollapsibleContent>
							<SidebarGroupContent>
								<SidebarMenu>
									{VERSIONS.map((v) => (
										<SidebarMenuItem key={v._id}>
											<SidebarMenuButton asChild>
												<Link href={`/docs/change-log#${v._id}`}>{v._id}</Link>
											</SidebarMenuButton>
										</SidebarMenuItem>
									))}
								</SidebarMenu>
							</SidebarGroupContent>
						</CollapsibleContent>
					</SidebarGroup>
				</Collapsible>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton asChild>
									<Link href="/docs/faq">
										<CircleHelp />
										<span>FAQ</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
