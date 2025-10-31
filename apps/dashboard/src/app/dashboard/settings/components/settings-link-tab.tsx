"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

import { cn } from "@/core/utils";
import { Fragment } from "react";

export default function SettingsLinkTab({
	href,
	orientation = "horizontal",
	layoutId = "underline",
}: {
	href: string;
	orientation?: "horizontal" | "vertical";
	layoutId?: string;
}) {
	const pathname = usePathname();

	return (
		<Fragment>
			{href === pathname ? (
				<motion.div
					className={cn(
						"absolute bg-zinc-300 z-0 rounded",
						orientation === "horizontal" && "h-px w-full -bottom-1",
						orientation === "vertical" && "w-[0.5px] h-full -left-1",
					)}
					layoutId={layoutId}
				/>
			) : null}
		</Fragment>
	);
}
