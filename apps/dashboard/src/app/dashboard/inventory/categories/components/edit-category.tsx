"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { Edit3 } from "lucide-react";

import type { PrivateCategory } from "@kristall/shared/domains/product-catalog/types/category.private";
import { FORM_MESSAGE_TYPES } from "@kristall/shared/types/forms/messages";

import { updateCategory } from "@kristall/client/services/product-catalog/use-cases/private/update-category";

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
import { Input, InputContainer, InputError } from "@kristall/ui/input";
import { Label } from "@kristall/ui/label";
import { Switch } from "@kristall/ui/switch";
import { cn } from "@kristall/ui/utils/cn";

export function EditCategoryButton({
	category,
}: { category: PrivateCategory }) {
	const [open, setOpen] = useState(false);

	const [response, dispatch] = useActionState(updateCategory, undefined);
	const [isCategoryActive, setIsCategoryActive] = useState(category.isActive);

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
		if (!open) {
			setIsCategoryActive(category.isActive);
		}
	}, [open]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm" className="flex-1">
					<Edit3 className="w-4 h-4 mr-2" />
					Editar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Editar categoría</DialogTitle>
				</DialogHeader>
				<form className="flex flex-col gap-y-4" action={dispatch}>
					<input type="hidden" name="_id" hidden value={category._id} />
					<InputContainer>
						<Label htmlFor="name">Nombre de la categoría</Label>
						<Input
							id="name"
							name="name"
							placeholder="Ej. Galletas, refrescos, etc."
							defaultValue={response?.fields?.name?.value || category.name}
						/>
						{response?.fields?.name?.message && (
							<InputError>{response.fields.name.message}</InputError>
						)}
					</InputContainer>
					<InputContainer>
						<Label htmlFor="isActive">Estado</Label>
						<div className="flex items-center justify-between gap-x-2">
							<label
								htmlFor="isActive"
								className={cn(
									"text-sm",
									isCategoryActive ? "text-zinc-200" : "text-zinc-400",
								)}
							>
								{isCategoryActive ? "Activo" : "Inactivo"}
							</label>
							<Switch
								name="isActive"
								checked={isCategoryActive}
								onCheckedChange={setIsCategoryActive}
							/>
						</div>
						{response?.fields?.isActive?.message && (
							<InputError>{response.fields.isActive.message}</InputError>
						)}
					</InputContainer>
					<DialogFooter>
						<SubmitButton pendingText="Guardando...">Guardar</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
