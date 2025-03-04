"use client";

import { Switch } from "@/components/ui";
import { toggleVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { useTransition } from "react";
import { toast } from "sonner";

export function ToggleVirtualShowroom({ isPublic }: { isPublic: boolean }) {
	const [isPending, startTransition] = useTransition();

	const onChange = (checked: boolean) =>
		startTransition(async () => {
			const toastId = toast.loading("Guardando cambios...");
			await toggleVirtualShowroom(checked);
			toast.success("Cambios guardados", {
				id: toastId,
			});
		});

	return (
		<Switch
			name="virtual-showroom"
			id="virtual-showroom"
			disabled={isPending}
			onCheckedChange={onChange}
			checked={isPublic}
		/>
	);
}
