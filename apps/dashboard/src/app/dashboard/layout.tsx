import type { Metadata } from "next";

import Header from "@/components/layout/header";
import { Version, VersionSkeleton } from "@/components/version";
import { SidebarProvider } from "@kristall/ui/sidebar";
import { Suspense } from "react";
import { AppSidebar } from "./components/app-sidebar";

export const metadata: Metadata = {
	title: "Kristall - Dashboard",
};

export const dynamic = "force-dynamic";

export default function DashboardLayout({
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
			<Suspense fallback={<VersionSkeleton />}>
				<Version />
			</Suspense>
		</SidebarProvider>
	);
}
