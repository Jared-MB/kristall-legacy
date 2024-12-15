"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import { uploadCategory } from "@kristall/core/categories/upload";

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

import { Blocks } from "lucide-react";

export function AddCategory({ asLink = false, showIcon = true }) {
	const [open, setOpen] = useState(false);

	const [response, dispatch] = useActionState(uploadCategory, undefined);

	useEffect(() => {
		if (response) {
			"message" in response && toast.error(response.message);
			if ("success" in response) {
				toast.success("Categoría creada exitosamente");
				setOpen(false);
			}
		}
	}, [response]);

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
						<Label>Nombre de la categoría</Label>
						<Input name="name" placeholder="Ej. Galletas, refrescos, etc." />
						{response && "name" in response && (
							<InputError>{response.name}</InputError>
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
