"use client";

import type { Location } from "@kristall/shared/domains/location-services/types";

import { useActionState, useEffect, useState } from "react";

import { updateLocation } from "@kristall/client/services/location-services/use-cases/private/update-location";

import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms";
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
import {
	Input,
	InputContainer,
	InputDescription,
	InputError,
} from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { toast } from "sonner";

export function EditLocation({ data }: { data: Location }) {
	const [open, setOpen] = useState<boolean>(false);

	const [state, dispatch] = useActionState(updateLocation, undefined);

	useEffect(() => {
		setOpen(false);
		if (state?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
			toast.success(state.message.value);
			return;
		}
		if (state?.message?.type === FORM_MESSAGE_TYPES.INTERNAL_ERROR) {
			toast.error(state.message.value);
			return;
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Editar ubicación</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar ubicación</DialogTitle>
					<DialogDescription>
						Los campos marcados con * son obligatorios
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-y-4 my-1" action={dispatch}>
					<input defaultValue={data._id} name="_id" type="hidden" hidden />
					<InputContainer>
						<Label>Nombre de la ubicación*</Label>
						<Input
							defaultValue={data.name}
							name="name"
							placeholder="Ej. Tienda 1"
						/>
						{state?.fields.name.message && (
							<InputError>{state.fields.name.message}</InputError>
						)}
					</InputContainer>
					<InputContainer>
						<Label>Dirección</Label>
						<Input
							defaultValue={data.address}
							name="address"
							placeholder="Ej. Calle 123"
						/>
						<InputDescription>
							Esta dirección será visible en los pedidos
						</InputDescription>
						{state?.fields.address.message && (
							<InputError>{state.fields.address.message}</InputError>
						)}
					</InputContainer>
					<InputContainer>
						<Label>Teléfono</Label>
						<Input
							defaultValue={data.phone}
							name="phone"
							type="number"
							placeholder="Ej. 1234567890"
						/>
						<InputDescription>
							Este teléfono será visible en los pedidos
						</InputDescription>
						{state?.fields.phone.message && (
							<InputError>{state.fields.phone.message}</InputError>
						)}
					</InputContainer>
					<DialogFooter>
						<Button
							variant="outline"
							type="button"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<SubmitButton type="submit" pendingText="Guardando...">
							Guardar cambios
						</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
