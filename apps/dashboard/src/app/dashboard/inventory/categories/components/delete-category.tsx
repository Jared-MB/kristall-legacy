"use client";

import type { PrivateCategory } from "@kristall/shared/domains/product-catalog/types/category.private";

import { useActionState, useEffect, useState } from "react";

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

import { deleteCategory } from "@kristall/client/services/product-catalog/use-cases/private/delete-category";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";
import { toast } from "sonner";

export function DeleteCategory({ category }: { category: PrivateCategory }) {
	const [state, dispatch] = useActionState(deleteCategory, undefined);
	const [open, setOpen] = useState(false);

	const closeModal = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (state?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
			toast.success(state.message.value);
			closeModal();
			return;
		}

		if (state?.message?.type === FORM_MESSAGE_TYPES.INTERNAL_ERROR) {
			toast.warning(state.message.value);
			return;
		}
	}, [state]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2 px-2 py-1.5 text-sm outline-hidden transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50">
					Eliminar
				</div>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Eliminar categoría</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					¿Estás seguro de que deseas eliminar la categoría{" "}
					<strong>{category.name}</strong>? No se mostrará en la lista de
					categorías y ya no podrá ser seleccionado para nuevas acciones.
				</DialogDescription>
				<form action={dispatch}>
					<input
						name="_id"
						defaultValue={category._id}
						hidden
						aria-hidden
						readOnly
					/>
					<DialogFooter className="mt-4">
						<Button type="button" variant="outline" onClick={closeModal}>
							Cancelar
						</Button>
						<SubmitButton variant="destructive" pendingText="Eliminando...">
							Eliminar
						</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
