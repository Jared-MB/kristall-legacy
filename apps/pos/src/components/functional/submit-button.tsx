"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "../ui/button";

import submitButton from "@/core/styles/submit-button.module.css";
import { cn } from "@/core/utils";

export function SubmitButton({
	children,
	pendingText = "Loading...",
	className,
	variant = "default",
	icon,
	disabled = false,
}: {
	children: React.ReactNode;
	pendingText?: string;
	className?: string;
	variant?: ButtonProps["variant"];
	icon?: React.ReactNode;
	disabled?: boolean;
}) {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending || disabled}
			className={cn("flex flex-row items-center gap-x-2", className)}
			type="submit"
			variant={variant}
		>
			{pending ? <Loader2 className={submitButton.loader} /> : icon}
			{pending ? pendingText : children}
		</Button>
	);
}
