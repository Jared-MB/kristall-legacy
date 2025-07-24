"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import type { PrivateClient } from "@kristall/shared/domains/user-management/types";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";

import { deleteClient } from "@kristall/client/services/user-management/use-cases/private/delete-client";

import { Button } from "@kristall/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@kristall/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";

interface Props {
	client: PrivateClient;
}

export function DeleteClient({ client }: Props) {
	const [state, dispatch] = useActionState(deleteClient, undefined);
	const [open, setOpen] = useState(false);

	const closeModal = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (state?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
			toast.success(state.message.value);
			setOpen(false);
			return;
		}
		if (state?.message?.type === FORM_MESSAGE_TYPES.INTERNAL_ERROR) {
			toast.error(state.message.value);
			setOpen(false);
			return;
		}
		if (state?.message?.type === FORM_MESSAGE_TYPES.MISSING_INTERNAL_FIELDS) {
			toast.error(state.message.value);
			setOpen(false);
			return;
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2 px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
					Archivar
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Archivar cliente</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					¿Estás seguro de que deseas archivar al cliente{" "}
					<strong>{client.name}</strong>? No se mostrará en la lista de clientes
					y ya no podrá ser seleccionado para nuevas acciones.
				</DialogDescription>
				<form action={dispatch}>
					<input
						name="_id"
						defaultValue={client._id}
						hidden
						aria-hidden
						readOnly
					/>
					<DialogFooter className="mt-4">
						<Button type="button" variant="outline" onClick={closeModal}>
							Cancelar
						</Button>
						<SubmitButton variant="destructive" pendingText="Archivando...">
							Archivar
						</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
