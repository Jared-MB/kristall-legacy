"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";
import * as React from "react";

import { cn } from "@/core/utils";

const InputOTP = ({
	ref,
	className,
	containerClassName,
	...props
}: React.ComponentProps<typeof OTPInput>) => (
	<OTPInput
		ref={ref}
		containerClassName={cn(
			"flex items-center gap-2 has-disabled:opacity-50",
			containerClassName,
		)}
		className={cn("disabled:cursor-not-allowed", className)}
		{...props}
	/>
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = ({
	ref,
	className,
	...props
}: React.ComponentProps<"div">) => (
	<div ref={ref} className={cn("flex items-center", className)} {...props} />
);
InputOTPGroup.displayName = "InputOTPGroup";

type InputOTPSlotProps = React.ComponentProps<"div"> & {
	index: number;
	placeholder?: string;
};
const InputOTPSlot = ({
	ref,
	index,
	className,
	...props
}: InputOTPSlotProps) => {
	const inputOTPContext = React.useContext(OTPInputContext);
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

	return (
		<div
			ref={ref}
			className={cn(
				"relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
				isActive && "z-10 ring-2 ring-ring ring-offset-background",
				className,
			)}
			{...props}
		>
			{char ? char : props.placeholder}
			{hasFakeCaret && (
				<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
					<div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
				</div>
			)}
		</div>
	);
};
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = ({ ref, ...props }: React.ComponentProps<"div">) => (
	// biome-ignore lint/a11y/useAriaPropsForRole:
	<div ref={ref} role="separator" {...props}>
		<Dot />
	</div>
);
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
