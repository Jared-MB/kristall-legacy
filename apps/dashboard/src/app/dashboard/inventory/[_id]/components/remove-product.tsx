"use client";

import type { Image } from "@/core/interfaces/entities";

import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { deleteProduct } from "../_adapters";

export default function RemoveProduct({ image }: { image: Image | undefined }) {
	const [open, setOpen] = useState<boolean>(false);
	const { _id } = useParams();

	const enhancedDeleteProduct = deleteProduct.bind(
		null,
		_id as string,
		image?._id,
	);

	const [error, dispatch] = useFormState(enhancedDeleteProduct, undefined);

	useEffect(() => {
		error && toast.error(error.message);
	}, [error]);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline">
					Eliminar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="text-xl">Eliminar producto</DialogHeader>
				<p>¿Estás seguro de que deseas eliminar este producto?</p>
				<DialogFooter className="flex flex-row gap-x-4">
					<Button
						type="button"
						variant="outline"
						onClick={() => setOpen(false)}
					>
						Cancelar
					</Button>
					<form action={dispatch}>
						<SubmitButton variant="destructive">Eliminar</SubmitButton>
					</form>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
