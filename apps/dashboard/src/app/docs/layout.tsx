import Header from "@/components/layout/header";
import { SidebarProvider } from "@kristall/ui/sidebar";
import { DocsSidebar } from "./components/docs-sidebar";

export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SidebarProvider>
			<DocsSidebar />
			<div className="grid grid-rows-[4rem_1fr] grow">
				<Header />
				{children}
			</div>
		</SidebarProvider>
	);
}
