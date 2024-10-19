"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button, type ButtonProps } from "./ui";

import submitButton from "@/core/styles/submit-button.module.css";
import { cn } from "@/core/utils";

export default function SubmitButton({
	children,
	pendingText = "Loading...",
	className,
	variant = "default",
	loading,
	disabled = false,
	form,
}: {
	children: React.ReactNode;
	pendingText?: string;
	className?: string;
	variant?: ButtonProps["variant"];
	loading?: boolean;
	disabled?: boolean;
	form?: string;
}) {
	const { pending } = useFormStatus();

	return (
		<Button
			form={form}
			disabled={pending || loading || disabled}
			className={cn("flex flex-row items-center gap-x-2", className)}
			type="submit"
			variant={variant}
		>
			{pending && <Loader2 className={submitButton.loader} />}
			{pending ? pendingText : children}
		</Button>
	);
}
