"use client";

import {
	Button,
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
	Input,
	InputContainer,
	Label,
	dropdownMenuTriggerClass,
} from "@/components/ui";
import { DatePicker } from "@/components/ui/date-picker";
import type { ProductBatch } from "@/types/batch";
import { forwardRef, useMemo, useState } from "react";
import { toast } from "sonner";
import {
	useBatchContext,
	useBatchesContext,
} from "../../context/batch-context";
import { useLocationsToAddContext } from "../../context/location-context";

const EditBatch = forwardRef(() => {
	const batch = useBatchContext();
	const { batches, editBatch } = useBatchesContext();

	const { locationsToAdd } = useLocationsToAddContext();

	const [open, setOpen] = useState(false);
	const [stock, setStock] = useState<number>(batch?.stock ?? 0);
	const [date, setDate] = useState<Date | undefined>(batch?.expirationDate);

	const locationToAdd = useMemo(() => {
		if (!batch) return undefined;
		return locationsToAdd.find(
			(location) => location.locationId === batch.locationProduct.locationId,
		);
	}, [locationsToAdd]);

	const handleClick = () => {
		if (!batch) {
			toast.error("No se pudo editar el lote");
			return;
		}

		const newBatch: ProductBatch | Omit<ProductBatch, "_id"> = {
			...batch,
			stock,
			expirationDate: date ?? new Date(),
		};

		let count = 0;
		for (const batch of batches) {
			if (batch.batchNumber === newBatch.batchNumber) {
				count += newBatch.stock;
			} else {
				count += batch.stock;
			}
		}

		if (locationToAdd && count > locationToAdd?.stock) {
			toast.error("No puedes agregar más stock del que tiene la ubicación");
			return;
		}

		editBatch(newBatch);
		setOpen(false);
	};

	if (!batch) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button type="button" className={dropdownMenuTriggerClass}>
					Editar
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Editar lote</DialogTitle>
				<div className="flex flex-row gap-x-4 items-end">
					<InputContainer>
						<Label>Stock</Label>
						<Input
							type="number"
							placeholder="0"
							value={stock}
							onChange={(e) => setStock(Number(e.target.value))}
						/>
					</InputContainer>
					<InputContainer>
						<Label>Expiración</Label>
						<DatePicker date={date} setDate={setDate} />
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
					<Button type="button" onClick={handleClick}>
						Guardar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
});

export default EditBatch;
