"use client";

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Input,
	InputContainer,
	Label,
	dropdownMenuTriggerClass,
} from "@/components/ui";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import {
	useLocationContext,
	useLocationsContext,
	useLocationsToAddContext,
} from "../../context/location-context";

export default function EditLocation() {
	const productLocation = useLocationContext();
	const locations = useLocationsContext();

	const { editLocation } = useLocationsToAddContext();

	const [open, setOpen] = useState(false);
	const [stock, setStock] = useState(productLocation?.stock ?? 0);

	const handleSubmit = () => {
		if (!productLocation) {
			toast.error("Error al obtener la ubicación. Intente de nuevo.");
			return;
		}
		editLocation(stock, productLocation.locationId);
		setOpen(false);
	};

	const location = useMemo(() => {
		return locations.find((ltn) => ltn._id === productLocation?.locationId);
	}, [locations, productLocation]);

	if (!location) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button type="button" className={dropdownMenuTriggerClass}>
					Editar
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{location?.name}</DialogTitle>
				</DialogHeader>
				<div className="flex flex-row gap-x-4 items-end">
					<InputContainer>
						<Label htmlFor="stock">Stock</Label>
						<Input
							id="stock"
							type="number"
							placeholder="0"
							defaultValue={productLocation?.stock}
							value={stock}
							onChange={(e) => setStock(+e.target.value)}
						/>
					</InputContainer>
					<Button onClick={handleSubmit}>Guardar</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
}
