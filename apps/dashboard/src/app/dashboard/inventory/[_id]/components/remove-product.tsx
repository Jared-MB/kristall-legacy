"use client";

import type { Image } from "@/core/interfaces/entities";

import { useParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { deleteProductById } from "@kristall/core/products/id";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { SubmitButton } from "@kristall/ui/functional/submit-button";

export default function RemoveProduct({ image }: { image: Image | undefined }) {
	const [open, setOpen] = useState<boolean>(false);
	const { _id } = useParams();

	const [isPending, startTransition] = useTransition();

	const handleClick = async () =>
		startTransition(async () => {
			if (typeof _id !== "string") {
				toast.error("Unexpected error");
				return;
			}
			const response = await deleteProductById(_id, image?._id);
			if (response.message) {
				toast.error(response.message);
			}
		});

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline">
					Eliminar
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="text-xl">
					<DialogTitle>Eliminar producto</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					¿Estás seguro de que deseas eliminar este producto?
				</DialogDescription>
				<DialogFooter className="flex flex-row gap-x-4">
					<Button
						type="button"
						variant="outline"
						onClick={() => setOpen(false)}
					>
						Cancelar
					</Button>
					<SubmitButton
						onClick={handleClick}
						loading={isPending}
						pendingText="Eliminando..."
						variant="destructive"
					>
						Eliminar
					</SubmitButton>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
