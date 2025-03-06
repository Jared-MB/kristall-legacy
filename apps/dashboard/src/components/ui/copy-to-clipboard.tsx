"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button, type ButtonProps } from "./button";

export default function CopyToClipboard({
	text,
	disabled,
	variant = "outline",
}: { text: string; disabled?: boolean; variant?: ButtonProps["variant"] }) {
	const copyToClipBoard = async () => {
		navigator.clipboard.writeText(text);
		toast.info("Copiado al portapapeles");
	};

	return (
		<Button
			size="icon"
			disabled={disabled}
			variant={variant}
			onClick={copyToClipBoard}
		>
			<Copy className="h-4 w-4" />
		</Button>
	);
}
