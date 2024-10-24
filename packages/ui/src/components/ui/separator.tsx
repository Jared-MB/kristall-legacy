"use client";

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@kristall/ui/core/utils";

const Separator = React.forwardRef<
	React.ElementRef<typeof SeparatorPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
	(
		{ className, orientation = "horizontal", decorative = true, ...props },
		ref,
	) => (
		<SeparatorPrimitive.Root
			ref={ref}
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"shrink-0 bg-border",
				orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
				className,
			)}
			{...props}
		/>
	),
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };

export function Divider({
	orientation = "horizontal",
	className,
}: { orientation?: "vertical" | "horizontal"; className?: string }) {
	if (orientation === "vertical")
		return (
			<div className={cn("w-full md:w-[1px] h-full bg-zinc-700", className)} />
		);
	return <hr className={cn("border-zinc-700", className)} />;
}
