"use client";

import { Switch } from "@/components/ui";
import { toggleVirtualShowroom } from "@kristall/core/virtual-showroom/data";
import { Button } from "@kristall/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@kristall/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function ToggleVirtualShowroom({ isPublic }: { isPublic: boolean }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();

	const toggle = async (checked: boolean) =>
		startTransition(async () => {
			const toastId = toast.loading("Guardando cambios...");
			await toggleVirtualShowroom(checked);
			setIsOpen(false);
			toast.success("Cambios guardados", {
				id: toastId,
			});
		});

	const onChange = (checked: boolean) => {
		if (isPublic) {
			toggle(checked);
			return;
		}
		setIsOpen(true);
	};

	return (
		<>
			<Switch
				name="virtual-showroom"
				id="virtual-showroom"
				disabled={isPending || isOpen}
				onCheckedChange={onChange}
				checked={isPublic}
			/>
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Habilitar Virtual Showroom</DialogTitle>
					</DialogHeader>
					<div className="flex flex-col gap-y-2 text-zinc-300 text-sm">
						<p>
							Al registrar un Virtual Showroom para su tienda en nuestra
							plataforma, usted reconoce y acepta que nos reservamos el derecho
							de{" "}
							<strong>
								modificar la URL de su tienda en cualquier momento
							</strong>{" "}
							si es requerido por razones operativas, técnicas o estratégicas
							del servicio.
						</p>
						<p>
							En caso de realizarse un cambio, le notificaremos con anticipación
							y le proporcionaremos la nueva URL asignada.
						</p>
					</div>
					<DialogFooter>
						<Button
							variant="outline"
							onClick={() => setIsOpen(false)}
							disabled={isPending}
						>
							Cancelar
						</Button>
						<SubmitButton
							onClick={() => toggle(!isPublic)}
							disabled={isPending}
							pendingText="Guardando cambios..."
						>
							Confirmar
						</SubmitButton>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
