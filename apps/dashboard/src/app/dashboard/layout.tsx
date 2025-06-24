import type { Metadata } from "next";

import Header from "@/components/layout/header";
import Version from "@/components/version";
import { SidebarProvider } from "@kristall/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";

export const metadata: Metadata = {
	title: "Kristall - Dashboard",
};

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="grid grid-rows-[4rem_1fr] grow">
				<Header />
				{children}
			</div>
			<Version />
		</SidebarProvider>
	);
}
