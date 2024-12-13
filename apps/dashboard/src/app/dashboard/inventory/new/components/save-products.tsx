"use client";

import { Button } from "@kristall/ui/button";

import { newInventory } from "@kristall/core/inventory/new";

import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useNewInventoryStore } from "../store/useNewInventoryStore";

export default function SaveProducts() {
	const products = useNewInventoryStore((state) => state.products);
	const clear = useNewInventoryStore((state) => state.clear);

	const [isPending, startTransition] = useTransition();

	const updateInventory = async () => {
		startTransition(async () => {
			const data = await newInventory(products);
			if (data === "ok") {
				toast.success("Productos guardados");
				clear();
				return;
			}
			toast.error("Algo salió mal");
		});
	};

	return (
		<Button disabled={isPending} onClick={updateInventory}>
			{isPending && <Loader2 className="loader mr-2" />}
			{isPending ? "Guardando..." : "Guardar"}
		</Button>
	);
}
