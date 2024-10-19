"use client";

import { cn } from "@/core/utils";
import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import type { InputProps } from "./input";

const Password = forwardRef<
	HTMLInputElement,
	InputProps & {
		icon?: React.ReactNode;
		classNames?: {
			container?: string;
		};
	}
>(({ className, icon, ...props }, ref) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div
			className={cn(
				"border h-10 w-full border-input bg-background pr-0 flex items-center justify-start gap-x-2 px-3 py-2 has-[:focus]:outline-none rounded-md has-[:focus]:ring-offset-background has-[:focus]:ring-2 has-[:focus]:ring-ring has-[:focus]:ring-offset-1",
				props.classNames?.container,
			)}
		>
			{icon}
			<input
				type={showPassword ? "text" : "password"}
				placeholder="* * * * * * * * *"
				className={cn(
					"flex w-full h-full bg-transparent text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50",
					className,
				)}
				ref={ref}
				{...props}
			/>
			<button type="button" onClick={() => setShowPassword(!showPassword)}>
				{showPassword ? <Eye /> : <EyeOff />}
			</button>
		</div>
	);
});
Password.displayName = "Password";

export { Password };
