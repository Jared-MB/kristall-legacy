"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { cn } from "../../core/utils";
import { Button, type ButtonProps } from "../ui/button";
import { CommandShortcut } from "../ui/command";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

interface Props extends ButtonProps {
	pendingText?: string;
	loading?: boolean;
}

export function SubmitButton({
	children,
	pendingText = "Guardando...",
	className,
	loading,
	disabled = false,
	...props
}: Props) {
	const { pending } = useFormStatus();

	return (
		<Button
			disabled={pending || loading || disabled}
			className={cn("flex flex-row items-center gap-x-2", className)}
			type="submit"
			{...props}
		>
			{(pending || loading) && <Loader2 className="loader mr-2" />}
			{pending || loading ? pendingText : children}
		</Button>
	);
}

/**
 * An alternative to SubmitButton that uses a tooltip to show the keyboard shortcut
 */
export function SaveButton({ isPending }: { isPending: boolean }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<SubmitButton pendingText="Guardando..." loading={isPending}>
						Guardar
					</SubmitButton>
				</TooltipTrigger>
				<TooltipContent>
					<div className="flex flex-row items-center justify-between gap-x-2">
						Guardar
						<CommandShortcut>Ctrl Enter</CommandShortcut>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
