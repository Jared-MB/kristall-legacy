"use client";

import { Blocks, Plus } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { useModalEvents } from "@kristall/client/hooks/use-modal-events";
import { uploadCategory } from "@kristall/client/services/product-catalog/use-cases/private/upload-category";

import { Button } from "@kristall/ui/button";
import * as Card from "@kristall/ui/card";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@kristall/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";
import { Input, InputContainer, InputError } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";

import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";

export function AddCategoryButton({ asLink = false, showIcon = true }) {
	const [open, setOpen] = useState(false);

	const [response, dispatch] = useActionState(uploadCategory, undefined);

	useEffect(() => {
		if (response?.message?.type === FORM_MESSAGE_TYPES.SUCCESS) {
			toast.success(response.message.value);
			setOpen(false);
			return;
		}
		if (response?.message?.type === FORM_MESSAGE_TYPES.INTERNAL_ERROR) {
			toast.error(response.message.value);
			return;
		}
	}, [response]);

	useEffect(() => {
		function openModal() {
			setOpen(true);
		}

		document.addEventListener("openAddModal", openModal);

		return () => {
			document.removeEventListener("openAddModal", openModal);
		};
	}, []);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant={asLink ? "link" : "default"}
					className="flex items-center gap-x-2"
				>
					{showIcon && <Blocks />}
					Agregar categoría
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crear categoría</DialogTitle>
				</DialogHeader>
				<form className="flex flex-col gap-y-4" action={dispatch}>
					<InputContainer>
						<Label htmlFor="name">Nombre de la categoría</Label>
						<Input
							id="name"
							name="name"
							placeholder="Ej. Galletas, refrescos, etc."
							defaultValue={response?.fields?.name?.value}
						/>
						{response?.fields?.name?.message && (
							<InputError>{response.fields.name.message}</InputError>
						)}
					</InputContainer>
					<DialogFooter>
						<SubmitButton pendingText="Creando categoría...">
							Crear categoría
						</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export function AddCategoryCard({ disabled = false }) {
	const { openAddModal } = useModalEvents();

	return (
		<button
			disabled={disabled}
			onClick={openAddModal}
			type="button"
			className="h-full disabled:cursor-not-allowed disabled:opacity-50"
		>
			<Card.Root className="h-full border-2 border-dashed border-zinc-700 hover:border-purple-500 transition-colors cursor-pointer group">
				<Card.Body className="flex flex-col items-center justify-center">
					<div className="p-3 rounded-full mb-4 bg-primary group-hover:bg-primary/90">
						<Plus className="w-5 h-5 text-zinc-300" />
					</div>
					<h3 className="text-sm font-medium mb-1">Nueva categoría</h3>
					<p className="text-xs text-zinc-400 text-center">
						Crear una nueva categoría
					</p>
				</Card.Body>
			</Card.Root>
		</button>
	);
}
