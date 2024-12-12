"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Input, InputContainer, Label } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { removeArrayFromArray } from "@/utils/array/removeArrayFromArray";
import {
	useLocationsContext,
	useLocationsToAddContext,
} from "../../context/location-context";

export default function AddLocation() {
	const locations = useLocationsContext();
	const { locationsToAdd, addLocation } = useLocationsToAddContext();

	const [stock, setStock] = useState<number>(0);
	const [locationId, setLocationId] = useState<string>("");
	const [open, setOpen] = useState<boolean>(false);

	const locationsToSelect = useMemo(() => {
		return removeArrayFromArray(locations, locationsToAdd, "locationId", "_id");
	}, [locations, locationsToAdd]);

	const handleAdd = () => {
		if (!locationId) {
			toast.error("Debes seleccionar una ubicación");
			return;
		}

		addLocation({
			locationId,
			stock,
		});
		setStock(0);
		setLocationId("");
		setOpen(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline">
					Agregar ubicación
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle className="text-xl">Agregar ubicación</DialogTitle>
				</DialogHeader>
				<div className="flex flex-col gap-4">
					<InputContainer>
						<Label>Ubicación</Label>
						<Select onValueChange={setLocationId}>
							<SelectTrigger>
								<SelectValue placeholder="Selecciona una ubicación" />
							</SelectTrigger>
							<SelectContent>
								{locationsToSelect.length > 0 ? (
									locationsToSelect.map((location) => (
										<SelectItem key={location._id} value={location._id}>
											{location.name}
										</SelectItem>
									))
								) : (
									<SelectItem disabled value="no-locations">
										No hay ubicaciones disponibles
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</InputContainer>
					<InputContainer>
						<Label>Stock</Label>
						<Input
							onChange={(e) => setStock(+e.target.value)}
							type="number"
							placeholder="0"
						/>
					</InputContainer>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancelar
						</Button>
						<Button type="button" onClick={handleAdd}>
							Agregar
						</Button>
					</DialogFooter>
				</div>
			</DialogContent>
		</Dialog>
	);
}
