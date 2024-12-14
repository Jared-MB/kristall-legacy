"use client";

import { CommandShortcut } from "@kristall/ui/command";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@kristall/ui/tooltip";

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
