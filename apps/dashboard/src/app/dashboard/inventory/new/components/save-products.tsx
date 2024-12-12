"use client";

import { Button } from "@kristall/ui/button";

import { newInventory } from "@kristall/core/inventory/new";

import { useTransition } from "react";
import { toast } from "sonner";
import { useNewInventoryStore } from "../store/useNewInventoryStore";

export default function SaveProducts() {
	const products = useNewInventoryStore((state) => state.products);
	const clear = useNewInventoryStore((state) => state.clear);

	const [isPending, startTransition] = useTransition();

	return (
		<Button
			disabled={isPending}
			onClick={async () => {
				startTransition(async () => {
					const data = await newInventory(products);
					if (data === "ok") {
						toast.success("Productos guardados");
						clear();
						return;
					}
					toast.error("Algo salió mal");
				});
			}}
		>
			Guardar
		</Button>
	);
}
