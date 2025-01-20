"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";

export default function CopyToClipboard({
	text,
	disabled,
}: { text: string; disabled?: boolean }) {
	const copyToClipBoard = async () => {
		navigator.clipboard.writeText(text);
		toast.info("Copiado al portapapeles");
	};

	return (
		<Button
			size="icon"
			disabled={disabled}
			variant="outline"
			onClick={copyToClipBoard}
		>
			<Copy />
		</Button>
	);
}
