"use client";

import { createSubscriptionIntent } from "@kristall/core/stripe/create";
import { Button } from "@kristall/ui/button";
import { useTransition } from "react";
import { toast } from "react-toastify";

export default function Pay({
	recommended = false,
	id,
}: {
	recommended?: boolean;
	id: string;
}) {
	const [isPending, startTransition] = useTransition();

	const handleClick = () =>
		startTransition(async () => {
			const { url } = await createSubscriptionIntent(id);

			if (!url) {
				toast.error("Ocurrió un error al procesar tu pago");
				return;
			}

			window.location.href = url;
		});

	return (
		<Button
			variant={recommended ? "default" : "outline"}
			className={recommended ? "shadow-md" : ""}
			onClick={handleClick}
			disabled={isPending}
		>
			{isPending ? "Procesando..." : "Empezar"}
		</Button>
	);
}
