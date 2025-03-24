"use client";

import { Button } from "@kristall/ui/button";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@kristall/ui/tooltip";

import { useShortcut } from "@kristall/core/hooks/use-shortcut";
import { CommandShortcut } from "@kristall/ui/command";
import { type ExternalToast, toast } from "sonner";
import { usePreview } from "./preview-context";

const TOAST_CONFIG: ExternalToast = {
	position: "bottom-right",
};

export function PreviewSave({
	ref,
}: { ref: React.RefObject<HTMLFormElement | null> }) {
	const { hasStateChanged, setHasStateChanged } = usePreview();

	const save = () => {
		if (!hasStateChanged) {
			toast.info("No hay cambios", TOAST_CONFIG);
			return;
		}
		ref?.current?.requestSubmit();
		toast.success("Guardado", TOAST_CONFIG);
		setHasStateChanged(false);
	};

	useShortcut(["s"], save, {
		ctrl: true,
	});

	if (!hasStateChanged) {
		return null;
	}

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button variant="secondary" size="icon" onClick={save}>
						<svg
							className="w-5 h-5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="white"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<title>Guardar cambios</title>
							<style>
								{`
                                    @keyframes drawLine {
                                    0% {
                                        stroke-dashoffset: 100;
                                    }
                                    100% {
                                        stroke-dashoffset: 0;
                                    }
                                    }
                                    
                                    .path1 {
                                    stroke-dasharray: 100;
                                    stroke-dashoffset: 100;
                                    animation: drawLine 0.6s linear forwards;
                                    animation-delay: 0.2s;
                                    }
                                    
                                    .path2 {
                                    stroke-dasharray: 100;
                                    stroke-dashoffset: 100;
                                    animation: drawLine 0.6s linear forwards;
                                    animation-delay: 0.2s;
                                    }
                                    
                                    .path3 {
                                    stroke-dasharray: 100;
                                    stroke-dashoffset: 100;
                                    animation: drawLine 0.6s linear forwards;
                                    animation-delay: 0.2s;
                                    }
                                    
                                    .path4 {
                                    stroke-dasharray: 100;
                                    stroke-dashoffset: 100;
                                    animation: drawLine 0.6s linear forwards;
                                    animation-delay: 0.2s;
                                    }
                                `}
							</style>
							<path className="path1" d="M10 2v3a1 1 0 0 0 1 1h5" />
							<path
								className="path2"
								d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6"
							/>
							<path className="path3" d="M18 22H4a2 2 0 0 1-2-2V6" />
							<path
								className="path4"
								d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z"
							/>
						</svg>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="top" sideOffset={5}>
					<p className="text-sm flex items-center gap-2">
						<span>Guardar cambios</span>{" "}
						<CommandShortcut>Ctrl+S</CommandShortcut>
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
