"use client";

import { cn } from "@kristall/ui/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AppSidebarLink({
	className,
	children,
	href,
	...props
}: React.ComponentProps<typeof Link> & {
	children: React.ReactNode[];
}) {
	const pathname = usePathname();

	const isActive = pathname === href.toString().split("?")[0];

	const [icon, text, announcement] = children;

	return (
		<Link {...props} className={cn(className)} href={href}>
			<span className="flex w-full items-center gap-2 overflow-hidden p-2 relative z-10">
				{icon}
				{text}
			</span>
			{announcement}
			{isActive && (
				<motion.div
					className="h-full w-full bg-sidebar-accent absolute z-0 -left-0.5 rounded-md"
					layoutId="nav-link"
				/>
			)}
		</Link>
	);
}
