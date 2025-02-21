"use client";

import { useIsMobile } from "@kristall/core/hooks/use-mobile";
import { DropdownMenuContent } from "@kristall/ui/dropdown-menu";

export function AppSidebarFooterMenu({
	children,
}: { children: React.ReactNode }) {
	const isMobile = useIsMobile();

	return (
		<DropdownMenuContent
			className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
			side={isMobile ? "bottom" : "right"}
			align="end"
			sideOffset={4}
		>
			{children}
		</DropdownMenuContent>
	);
}
