"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function SaveRemember() {
	useEffect(() => {
		toast.info("Al finalizar de editar, no olvides guardar los cambios", {
			duration: 3000,
		});
	}, []);

	return null;
}
