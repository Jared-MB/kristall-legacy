"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import type { PrivateClient } from "@kristall/shared/domains/user-management/types";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";

import { updateClient } from "@kristall/client/services/user-management/use-cases/private/update-client";

import { Button } from "@kristall/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@kristall/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { Input, InputContainer } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";

interface Props {
	client: PrivateClient;
}

export function EditClient({ client }: Props) {
	const [state, dispatch] = useActionState(updateClient, undefined);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (state?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
			toast.success(state.message.value);
			setOpen(false);
		}
	}, [state]);

	if (!client.isActive) {
		return (
			<div
				data-disabled
				className="relative flex cursor-not-allowed items-center rounded-sm gap-x-2 px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
			>
				Editar
			</div>
		);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2 px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
					Editar
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar cliente</DialogTitle>
				</DialogHeader>
				<form action={dispatch}>
					<input
						name="_id"
						defaultValue={client._id}
						hidden
						aria-hidden
						readOnly
					/>
					<InputContainer>
						<Label>Nombre</Label>
						<Input
							name="name"
							type="text"
							placeholder="Nombre del cliente"
							defaultValue={client.name}
						/>
					</InputContainer>
					<DialogFooter className="mt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<SubmitButton>Guardar</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
