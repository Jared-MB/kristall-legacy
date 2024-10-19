"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Input, InputContainer, Label } from "@/components/ui";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { ProductBatch } from "@/types/batch";
import type { LocationProduct } from "@/types/location";
import {
	type BatchToAdd,
	useBatchesContext,
} from "../../context/batch-context";
import {
	type LocationToAdd,
	useLocationsContext,
	useLocationsToAddContext,
} from "../../context/location-context";

export default function AddBatch() {
	const locations = useLocationsContext();
	const { locationsToAdd } = useLocationsToAddContext();

	const { batches, addBatch } = useBatchesContext();

	const [open, setOpen] = useState(false);

	const [location, setLocation] = useState<
		LocationProduct | LocationToAdd | undefined
	>(undefined);
	const [locationId, setLocationId] = useState("");
	const [stock, setStock] = useState(0);
	const [expirationDate, setExpirationDate] = useState<Date | undefined>(
		new Date(),
	);

	const { usedStock, totalStock } = useMemo(() => {
		const location = locationsToAdd.find(
			(location) => location.locationId === locationId,
		);
		const totalStock = location?.stock ?? 0;
		const usedStock = batches.reduce((acc, batch) => {
			if (batch.locationProduct.locationId === locationId) {
				return acc + batch.stock;
			}
			return acc;
		}, 0);
		return { totalStock, usedStock };
	}, [locationsToAdd, batches, locationId]);

	useEffect(() => {
		const selectedLocation = locationsToAdd.find(
			(ltn) => ltn.locationId === locationId,
		);
		setLocation(selectedLocation);
	}, [locationId]);

	const handleAdd = () => {
		if (!locationId || !stock || !expirationDate || !location) {
			return toast.error("Debes completar todos los campos");
		}

		const batch: ProductBatch | BatchToAdd = {
			expirationDate,
			stock,
			locationProduct: location,
			batchNumber: batches.length + 1,
		};

		if (usedStock + stock > totalStock) {
			return toast.error(
				"La cantidad de stock a agregar supera el stock total disponible",
			);
		}

		addBatch(batch);
		setOpen(false);
		setStock(0);
		setLocationId("");
		setExpirationDate(new Date());
	};

	const getName = useCallback(
		(locationId: string) => {
			const location = locations.find(
				(location) => location._id === locationId,
			);
			return location?.name;
		},
		[locationsToAdd],
	);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button type="button" variant="outline">
					Agregar lote
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader className="text-xl">Agregar lote</DialogHeader>
				<div className="flex flex-col gap-4">
					<InputContainer>
						<Label>Ubicación</Label>
						<Select onValueChange={setLocationId}>
							<SelectTrigger>
								<SelectValue placeholder="Selecciona una ubicación" />
							</SelectTrigger>
							<SelectContent>
								{locationsToAdd.length > 0 ? (
									locationsToAdd.map((location) => (
										<SelectItem
											key={location.locationId}
											value={location.locationId}
										>
											{getName(location.locationId)}
										</SelectItem>
									))
								) : (
									<SelectItem disabled value="no-locations">
										No hay ubicaciones disponibles, agregue una antes.
									</SelectItem>
								)}
							</SelectContent>
						</Select>
					</InputContainer>
					<div className="flex flex-row items-center gap-x-4">
						<InputContainer>
							<Label>
								Stock{" "}
								<small>
									({usedStock}/{totalStock})
								</small>
							</Label>
							<Input
								disabled={!locationId || usedStock === totalStock}
								onChange={(e) => setStock(+e.target.value)}
								type="number"
								placeholder="0"
							/>
						</InputContainer>
						<InputContainer>
							<Label>Fecha de expiración</Label>
							<DatePicker
								fromDate={new Date()}
								date={expirationDate}
								setDate={setExpirationDate}
							/>
						</InputContainer>
					</div>
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
