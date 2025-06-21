"use client";

import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@kristall/ui/core/utils";
import { toggleVariants } from "../ui/toggle";

const ToggleGroupContext = React.createContext<
	VariantProps<typeof toggleVariants>
>({
	size: "default",
	variant: "default",
});

const ToggleGroup = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
		VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
	<ToggleGroupPrimitive.Root
		ref={ref}
		className={cn(
			"flex items-center justify-center [&_button:first-child]:rounded-l-md [&_button:last-child]:rounded-r-md",
			className,
		)}
		{...props}
	>
		<ToggleGroupContext.Provider value={{ variant, size }}>
			{children}
		</ToggleGroupContext.Provider>
	</ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
	React.ElementRef<typeof ToggleGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
		VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
	const context = React.useContext(ToggleGroupContext);

	return (
		<ToggleGroupPrimitive.Item
			ref={ref}
			className={cn(
				toggleVariants({
					variant: context.variant || variant,
					size: context.size || size,
				}),
				"rounded-none",
				className,
			)}
			{...props}
		>
			{children}
		</ToggleGroupPrimitive.Item>
	);
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
