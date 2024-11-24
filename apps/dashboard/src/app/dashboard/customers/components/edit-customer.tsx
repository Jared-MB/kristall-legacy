"use client";

import { editCustomer } from "@/actions/customer.actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputContainer } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/core/hooks";
import type { Customer } from "@/types/customer";
import { forwardRef, useActionState, useEffect, useState } from "react";

const initialState = {
	message: "",
	error: {
		message: "",
		_id: "",
		name: "",
	},
};

const EditCustomer = forwardRef<
	HTMLFormElement,
	{ customer: Customer; closeMenu: () => void }
>(({ customer, closeMenu }, _ref) => {
	const { promiseToast, resolveToast } = useToast();

	const [state, action] = useActionState(editCustomer, initialState);
	const [open, setOpen] = useState(false);

	const onOpenChange = (value: boolean) => {
		setOpen(value);
		if (!value) {
			closeMenu();
		}
	};

	const handleAction = (data: FormData) => {
		promiseToast();
		action(data);
	};

	const closeModal = () => {
		setOpen(false);
		closeMenu();
	};

	useEffect(() => {
		if ("message" in state && state.message) {
			resolveToast(state.message);
			setOpen(false);
			closeMenu();
			return;
		}
		if ("errors" in state && state.errors) {
			const errors = Object.entries(state.errors);
			const errorMessage = `${errors[0][0]}: ${errors[0][1]}`;
			resolveToast(errorMessage, "error");
			setOpen(false);
			closeMenu();
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2  px-2 py-1.5  text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
					Editar
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h4 className="text-2xl">Editar cliente</h4>
				</DialogHeader>
				<form action={handleAction}>
					<input
						name="_id"
						defaultValue={customer._id}
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
							defaultValue={customer.name}
						/>
					</InputContainer>
					<DialogFooter className="mt-4">
						<Button type="button" variant="outline" onClick={closeModal}>
							Cancelar
						</Button>
						<Button type="submit">Guardar</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
});

export default EditCustomer;
// export default function EditCustomer({ customer }: { customer: Customer }) {

// }
