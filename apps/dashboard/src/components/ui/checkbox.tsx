"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import type * as React from "react";

import { cn } from "@/core/utils";

const Checkbox = ({
	ref,
	className,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			"peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator
			className={cn("flex items-center justify-center text-current")}
		>
			<Check className="h-4 w-4" />
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };

export function CheckboxLabel({
	children,
	id,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
	children: React.ReactNode;
	id: string;
}) {
	return (
		<div className="flex items-center space-x-2">
			<Checkbox id={id} {...props} />
			<label
				htmlFor={id}
				className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				{children}
			</label>
		</div>
	);
}

export function CheckboxWithDescription({
	children,
	description,
	id,
	...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & {
	children: React.ReactNode;
	description: string;
	id: string;
}) {
	return (
		<div className="items-top flex space-x-2">
			<Checkbox id={id} {...props} />
			<div className="grid gap-1.5 leading-none">
				<label
					htmlFor={id}
					className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
				>
					{children}
				</label>
				<small className="text-xs text-muted-foreground">{description}</small>
			</div>
		</div>
	);
}
