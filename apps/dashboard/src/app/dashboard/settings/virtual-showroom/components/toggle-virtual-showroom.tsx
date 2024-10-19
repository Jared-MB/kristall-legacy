"use client";

import { toggleVirtualShowroom } from "@/actions/virtual-showroom/virtual-showroom.action";
import { Switch } from "@/components/ui";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ToggleVirtualShowroom({
	isPublic,
}: {
	isPublic: boolean;
}) {
	const [isPending, startTransition] = useTransition();

	const onChange = (checked: boolean) => {
		startTransition(async () => {
			const toastId = toast.loading("Guardando cambios...");
			await toggleVirtualShowroom(checked);
			toast.success("Cambios guardados", {
				id: toastId,
			});
		});
	};

	return (
		<Switch
			disabled={isPending}
			onCheckedChange={onChange}
			checked={isPublic}
		/>
	);
}
