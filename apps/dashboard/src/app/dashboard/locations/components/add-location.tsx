"use client";

import { addLocation } from "@/actions/location.actions";
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
import { useDialogForm } from "@/core/hooks";
import type { Location } from "@/types/location";

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

export default function AddLocation() {
	const {
		modal: { open, setOpen },
		action,
	} = useDialogForm(addLocation, initialState, {
		entityName: "Ubicación",
		gender: "female",
	});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Agregar ubicación</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="text-2xl">Agregar ubicación</DialogHeader>
				<DialogDescription>
					Los campos marcados con * son obligatorios
				</DialogDescription>
				<form className="flex flex-col gap-y-4 my-1" action={action}>
					<InputContainer>
						<Label>Nombre de la ubicación*</Label>
						<Input name="name" placeholder="Ej. Tienda 1" />
					</InputContainer>
					<InputContainer>
						<Label>Dirección</Label>
						<Input name="address" placeholder="Ej. Calle 123" />
						<InputDescription>
							Esta dirección será visible en los pedidos
						</InputDescription>
					</InputContainer>
					<InputContainer>
						<Label>Teléfono</Label>
						<Input name="phone" type="number" placeholder="Ej. 1234567890" />
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
