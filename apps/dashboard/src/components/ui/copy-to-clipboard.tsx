"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./button";

export default function CopyToClipboard({ text }: { text: string }) {
	const copyToClipBoard = async () => {
		navigator.clipboard.writeText(text);
		toast.info("Copiado al portapapeles");
	};

	return (
		<Button size="icon" variant="outline" onClick={copyToClipBoard}>
			<Copy />
		</Button>
	);
}
