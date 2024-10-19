"use client";

import { Button, CommandShortcut } from "@/components/ui";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import submitButton from "@/core/styles/submit-button.module.css";

export default function SaveButton() {
	const { pending } = useFormStatus();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={pending}
						className="flex flex-row items-center gap-x-2"
						type="submit"
					>
						{pending && <Loader2 className={submitButton.loader} />}
						{pending ? "Guardando..." : "Guardar"}
					</Button>
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
