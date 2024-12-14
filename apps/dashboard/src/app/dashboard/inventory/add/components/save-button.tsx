"use client";

import { Button, CommandShortcut } from "@/components/ui";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Loader2 } from "lucide-react";

import submitButton from "@/core/styles/submit-button.module.css";

export function SaveButton({ isPending }: { isPending: boolean }) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						disabled={isPending}
						className="flex flex-row items-center gap-x-2"
						type="submit"
					>
						{isPending && <Loader2 className={submitButton.loader} />}
						{isPending ? "Guardando..." : "Guardar"}
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
