"use client";

import { useActionState, useEffect, useState } from "react";

import { uploadLocation } from "@kristall/client/services/location-services/use-cases/private/upload-location";

import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
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

export function AddLocation() {
	const [open, setOpen] = useState(false);
	const [state, action] = useActionState(uploadLocation, undefined);

	useEffect(() => {
		if (state?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
			toast.success(state.message.value);
			setOpen(false);
			return;
		}
		if (state?.message?.type === FORM_MESSAGE_TYPES.INTERNAL_ERROR) {
			toast.error(state.message.value);
			return;
		}
		if (
			state?.message?.type ===
			FORM_MESSAGE_TYPES.SUBSCRIPTION_FEATURE_LIMIT_REACHED
		) {
			toast.error(state.message.value);
			setOpen(false);
			return;
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Agregar ubicación</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Agregar ubicación</DialogTitle>
					<DialogDescription>
						Los campos marcados con * son obligatorios
					</DialogDescription>
				</DialogHeader>
				<form className="flex flex-col gap-y-4" action={action}>
					<InputContainer>
						<Label>Nombre de la ubicación*</Label>
						<Input
							name="name"
							placeholder="Ej. Tienda 1"
							defaultValue={state?.fields.name.value}
						/>
						{state?.fields.name.message && (
							<InputError>{state.fields.name.message}</InputError>
						)}
					</InputContainer>
					<InputContainer>
						<Label>Dirección</Label>
						<Input
							name="address"
							placeholder="Ej. Calle 123"
							defaultValue={state?.fields.address.value}
						/>
						{state?.fields.address.message && (
							<InputError>{state.fields.address.message}</InputError>
						)}
						<InputDescription>
							Esta dirección será visible en los pedidos
						</InputDescription>
					</InputContainer>
					<InputContainer>
						<Label>Teléfono</Label>
						<Input
							name="phone"
							type="number"
							placeholder="Ej. 1234567890"
							defaultValue={state?.fields.phone.value}
						/>
						{state?.fields.phone.message && (
							<InputError>{state.fields.phone.message}</InputError>
						)}
						<InputDescription>
							Este teléfono será visible en los pedidos
						</InputDescription>
					</InputContainer>
					<DialogFooter>
						<Button
							variant="outline"
							type="button"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<SubmitButton pendingText="Guardando...">Agregar</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export function AddLocationDisabled() {
	const notAllowedToast = () =>
		toast.info("Límite de ubicaciones alcanzado", {
			position: "top-right",
		});

	return (
		<Button variant="outline" onClick={notAllowedToast}>
			Agregar ubicación
		</Button>
	);
}

export function AddLocationSkeleton() {
	return (
		<Button variant="outline" disabled>
			Agregar ubicación
		</Button>
	);
}
