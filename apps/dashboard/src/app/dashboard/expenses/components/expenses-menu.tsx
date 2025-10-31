"use client";

import { addExpense } from "@/actions/expenses.actions";
import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	Input,
	InputContainer,
	InputError,
	Label,
} from "@/components/ui";
import { DollarSign, MoreVertical } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export default function ExpensesMenu() {
	const [open, setOpen] = useState(false);

	const [response, dispatch] = useActionState(addExpense, undefined);

	useEffect(() => {
		if (response?.success) {
			toast.success("Gasto agregado correctamente");
			setOpen(false);
		}
	}, [response]);

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button size="icon" variant="outline">
					<MoreVertical />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Opciones</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Dialog>
						<DialogTrigger asChild>
							<div className="relative flex cursor-pointer items-center rounded-sm gap-x-2  px-2 py-1.5  text-sm outline-hidden transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50">
								Nuevo gasto
							</div>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Nuevo gasto</DialogTitle>
							</DialogHeader>
							<form action={dispatch} className="flex flex-col gap-y-4">
								<InputContainer>
									<Label>Concepto</Label>
									<Input name="concept" placeholder="Ej. Compra de insumos" />
									{response?.errors &&
										"concept" in response.errors &&
										response.errors.concept && (
											<InputError>{response.errors.concept[0]}</InputError>
										)}
								</InputContainer>
								<InputContainer>
									<Label>Monto</Label>
									<Input icon={<DollarSign />} name="amount" placeholder="0" />
								</InputContainer>
								<DialogFooter>
									<Button
										type="button"
										variant="outline"
										onClick={() => setOpen(false)}
									>
										Cancelar
									</Button>
									<Button type="submit">Guardar</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
