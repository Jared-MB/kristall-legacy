"use client";

import { Button } from "@kristall/ui/button";
import { Trash } from "lucide-react";
import { useNewInventoryStore } from "../store/useNewInventoryStore";

export default function RemoveProducts() {
	const clearProducts = useNewInventoryStore((state) => state.clear);

	return (
		<Button variant="outline" onClick={clearProducts}>
			<Trash className="w-4 h-4 mr-2" /> Eliminar
		</Button>
	);
}
