import type * as React from "react";

import { cn } from "@kristall/ui/core/utils";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	icon?: React.ReactNode;
	classNames?: {
		/**
		 * @deprecated use classNameContainer instead
		 */
		container?: string;
	};
	classNameContainer?: string;
	endContent?: React.ReactNode;
	ref?: React.Ref<HTMLInputElement>;
}

const Input = ({
	ref,
	className,
	type,
	icon,
	classNameContainer,
	endContent,
	...props
}: InputProps) => {
	return (
		<div
			className={cn(
				"border h-10 w-full border-input bg-background flex items-center justify-start gap-x-2 px-3 py-2 has-[:focus]:outline-none rounded-md has-[:focus]:ring-offset-background has-[:focus]:ring-2 has-[:focus]:ring-ring has-[:focus]:ring-offset-1",
				props.classNames?.container,
				classNameContainer,
				endContent ? "pr-0" : "",
			)}
		>
			{icon}
			<input
				type={type}
				className={cn(
					"flex w-full h-full bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
			{endContent}
		</div>
	);
};
Input.displayName = "Input";

export function InputContainer({
	children,
	className,
	classNames,
}: {
	children: React.ReactNode;
	/**
	 * @deprecated use className instead
	 */
	classNames?: { container?: string };
	className?: string;
}) {
	return (
		<div
			className={cn(
				"grid w-full items-center gap-2",
				classNames?.container,
				className,
			)}
		>
			{children}
		</div>
	);
}

export function InputDescription({ children }: { children: React.ReactNode }) {
	return <small className="text-muted-foreground text-xs">{children}</small>;
}

export function InputError({ children }: { children: React.ReactNode }) {
	return <small className="text-rose-400 text-xs">{children}</small>;
}

export { Input };
