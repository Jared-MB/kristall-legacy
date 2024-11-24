"use client";

import { cutOffInventory } from "@/actions/product.actions";
import Divider from "@/components/divider";
import SubmitButton from "@/components/submit-button";
import {
	Button,
	CheckboxWithDescription,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	InputContainer,
	InputDescription,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	dropdownMenuTriggerClass,
} from "@/components/ui";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { cn } from "@/core/utils";
import { forwardRef, useActionState, useState } from "react";
import { useLocationsContext } from "../../context/location-context";

const InventoryCut = forwardRef(() => {
	const locations = useLocationsContext();

	const [errors, dispatch] = useActionState(cutOffInventory, undefined);

	const [onlySoldProducts, setOnlySoldProducts] = useState(false);
	const [location, setLocation] = useState(
		locations[1]?._id ?? locations[0]?._id,
	);

	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = (value: boolean) => setOpenDialog(value);

	return (
		<Dialog open={openDialog} onOpenChange={handleOpenDialog}>
			<DialogTrigger
				disabled
				className={cn(
					dropdownMenuTriggerClass,
					"disabled:opacity-50 hover:disabled:bg-none",
				)}
			>
				Realizar corte de inventario
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Realizar corte de inventario</DialogTitle>
				</DialogHeader>
				<Divider />
				<form action={dispatch} className="flex flex-col gap-y-4">
					<InputContainer>
						<Label>Rango de fechas</Label>
						<DatePickerWithRange />
						<InputDescription>
							Se mostrarán los productos dentro en el rango de tiempo
							establecido
						</InputDescription>
					</InputContainer>
					<InputContainer>
						<Label>Ubicación</Label>
						<Select onValueChange={setLocation} defaultValue={location}>
							<SelectTrigger className="max-w-xs">
								<SelectValue placeholder="Ubicación" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">Todas</SelectItem>
								{locations.map((location) => (
									<SelectItem key={location._id} value={location._id}>
										{location.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						<input
							hidden
							aria-hidden
							type="text"
							name="location"
							id="location"
							value={location}
							readOnly
						/>
					</InputContainer>
					<InputContainer>
						<CheckboxWithDescription
							id="onlySoldProducts"
							defaultChecked={onlySoldProducts}
							onCheckedChange={() => setOnlySoldProducts(!onlySoldProducts)}
							description="Se mostrarán sólo los productos vendidos dentro rango de tiempo establecido"
						>
							Sólo productos vendidos
						</CheckboxWithDescription>
						<input
							hidden
							aria-hidden
							name="onlySoldProducts"
							id="onlySoldProducts"
							value={onlySoldProducts ? "on" : "off"}
							readOnly
						/>
					</InputContainer>
					<DialogFooter className="mt-2">
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpenDialog(false)}
						>
							Cancelar
						</Button>
						<SubmitButton>Realizar corte</SubmitButton>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
});

export default InventoryCut;
