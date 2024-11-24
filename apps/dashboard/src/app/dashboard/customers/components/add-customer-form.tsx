"use client";

import { addCustomer } from "@/actions/customer.actions";
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
	Input,
	InputContainer,
	Label,
} from "@/components/ui";
import { useToast } from "@/core/hooks";
import { useActionState, useEffect, useState } from "react";

const initialState = {
	message: "",
	error: {
		message: "",
		_id: "",
		name: "",
	},
};

export default function AddCustomer() {
	const { promiseToast, resolveToast } = useToast();

	const [state, action] = useActionState(addCustomer, initialState);
	const [open, setOpen] = useState(false);

	const handleAction = (data: FormData) => {
		promiseToast();
		action(data);
	};

	useEffect(() => {
		if ("message" in state && state.message) {
			resolveToast(state.message);
			setOpen(false);
			return;
		}
		if ("errors" in state && state.errors) {
			const errors = Object.entries(state.errors);
			const errorMessage = `${errors[0][0]}: ${errors[0][1]}`;
			resolveToast(errorMessage, "error");
			setOpen(false);
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button">Agregar cliente</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h4 className="text-2xl">Agregar cliente</h4>
				</DialogHeader>
				<form action={handleAction}>
					<InputContainer>
						<Label>Nombre</Label>
						<Input name="name" type="text" placeholder="Nombre del cliente" />
					</InputContainer>
					<DialogFooter className="mt-4">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<Button>Guardar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
