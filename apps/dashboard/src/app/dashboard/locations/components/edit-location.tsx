"use client";

import { editLocation } from "@/actions/location.actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputContainer, InputDescription } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/core/hooks";
import type { Location } from "@/types/location";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = { location: null as Location | null, errors: null } as
	| { location: Location | null }
	| {
			errors: {
				name?: string[];
				address?: string[];
				phone?: string[];
			};
	  }
	| {
			errors: {
				message: string;
			};
	  };

export default function EditLocation({ data }: { data: Location }) {
	const [open, setOpen] = useState<boolean>(false);

	const [state, action] = useFormState(editLocation, initialState);

	const { promiseToast, resolveToast } = useToast();

	const handleAction = (data: FormData) => {
		promiseToast();
		action(data);
	};

	useEffect(() => {
		setOpen(false);
		if ("location" in state && state.location) {
			resolveToast("Ubicación editada correctamente");
			return;
		}
		if ("errors" in state && state.errors) {
			const errors = Object.entries(state.errors);
			const errorMessage = `${errors[0][0]}: ${errors[0][1]}`;
			resolveToast(errorMessage, "error");
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Editar ubicación</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="text-2xl">Editar ubicación</DialogHeader>
				<DialogDescription>
					Los campos marcados con * son obligatorios
				</DialogDescription>
				<form className="flex flex-col gap-y-4 my-1" action={handleAction}>
					<input defaultValue={data._id} name="_id" type="hidden" hidden />
					<InputContainer>
						<Label>Nombre de la ubicación*</Label>
						<Input
							defaultValue={data.name}
							name="name"
							placeholder="Ej. Tienda 1"
						/>
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
					</InputContainer>
					<DialogFooter>
						<Button
							variant="outline"
							type="button"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<Button type="submit">Agregar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
