"use client";

import { removeCustomer } from "@/actions/customer.actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/core/hooks";
import type { Customer } from "@/types/customer";
import { forwardRef, useEffect, useState } from "react";
import { useFormState } from "react-dom";

const initialState = {
	message: "",
	error: {
		message: "",
		_id: "",
		name: "",
	},
};

const RemoveCustomer = forwardRef<
	HTMLFormElement,
	{ customer: Customer; closeMenu: () => void }
>(({ customer, closeMenu }, _ref) => {
	const [state, action] = useFormState(removeCustomer, initialState);

	const { promiseToast, resolveToast } = useToast();
	const [open, setOpen] = useState(false);

	const onOpenChange = (value: boolean) => {
		setOpen(value);
		if (!value) {
			closeMenu();
		}
	};

	const closeModal = () => {
		setOpen(false);
		closeMenu();
	};

	const handleAction = (data: FormData) => {
		promiseToast();
		action(data);
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
				<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2 px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
					Eliminar
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<h4 className="text-2xl">Eliminar cliente</h4>
				</DialogHeader>
				<DialogDescription>
					¿Estás seguro de que deseas eliminar al cliente{" "}
					<strong>{customer.name}</strong>? Esta acción no se puede deshacer.
				</DialogDescription>
				<form action={handleAction}>
					<input
						name="_id"
						defaultValue={customer._id}
						hidden
						aria-hidden
						readOnly
					/>
					<DialogFooter className="mt-4">
						<Button type="button" variant="outline" onClick={closeModal}>
							Cancelar
						</Button>
						<Button type="submit" variant="destructive">
							Eliminar
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
});

export default RemoveCustomer;
