"use client";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input, InputContainer, InputError } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Blocks } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { uploadCategory } from "../_adapters";

/**
 * Refactor to get out of category route
 */
export default function AddCategory({ asLink = false, showIcon = true }) {
	const [open, setOpen] = useState(false);

	const [response, dispatch] = useFormState(uploadCategory, undefined);

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
					<h3 className="text-2xl">Crear categoría</h3>
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
