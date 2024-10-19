"use client";

import { useMemo, useState } from "react";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	dropdownMenuTriggerClass,
} from "@/components/ui";

import { toast } from "sonner";
import { useBatchesContext } from "../../context/batch-context";
import {
	useLocationContext,
	useLocationsContext,
	useLocationsToAddContext,
} from "../../context/location-context";

export default function DeleteLocation() {
	const { removeLocation } = useLocationsToAddContext();
	const productLocation = useLocationContext();
	const locations = useLocationsContext();
	const { removeBatchByLocationId } = useBatchesContext();

	const location = useMemo(() => {
		return locations.find((ltn) => ltn._id === productLocation?.locationId);
	}, [locations]);

	const [open, setOpen] = useState(false);

	const handleDelete = () => {
		if (!productLocation) {
			toast.error("Error al obtener la ubicación");
			return;
		}

		removeLocation(productLocation.locationId);
		removeBatchByLocationId(productLocation.locationId);
		setOpen(false);
	};

	if (!productLocation || !location) return null;

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<button type="button" className={dropdownMenuTriggerClass}>
					Eliminar
				</button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Eliminar ubicación</DialogTitle>
				</DialogHeader>
				<DialogDescription>
					¿Estás seguro de que deseas eliminar esta ubicación ({location.name}
					)?
				</DialogDescription>
				<DialogFooter>
					<Button
						variant="outline"
						type="button"
						onClick={() => setOpen(false)}
					>
						Cancelar
					</Button>
					<Button type="button" onClick={handleDelete}>
						Eliminar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
