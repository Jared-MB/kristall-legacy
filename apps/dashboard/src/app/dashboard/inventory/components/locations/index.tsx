"use client";

import { useEffect, useMemo } from "react";
import { toast } from "sonner";

import {
	CardBody,
	CardSubtitle,
	Switch,
	SwitchContainer,
} from "@/components/ui";
import { Label } from "@/components/ui/label";

import AddLocation from "./add-location";
import Location from "./location";

import { useBatchesContext } from "../../context/batch-context";
import { useLocationsToAddContext } from "../../context/location-context";

export default function Locations() {
	const { locationsToAdd } = useLocationsToAddContext();

	const { isEnabled, setEnabled } = useBatchesContext();

	const totalStock = useMemo(() => {
		return locationsToAdd.reduce((acc, location) => acc + location.stock, 0);
	}, [locationsToAdd]);

	useEffect(() => {
		toast.info("Al finalizar de editar, no olvides guardar los cambios", {
			duration: 3000,
		});
	}, []);

	return (
		<CardBody className="flex flex-col gap-y-4">
			<header className="flex justify-between items-start md:items-center">
				<div className="flex flex-col items-start">
					<CardSubtitle>Ubicaciones y stock</CardSubtitle>
					<span className="text-zinc-400 text-sm flex flex-row justify-center items-center gap-x-2">
						Stock:{" "}
						<span className="font-medium text-zinc-300 text-2xl">
							{totalStock}
						</span>
					</span>
				</div>
				<div className="flex flex-col-reverse items-end md:flex-row flex-wrap flow gap-y-2 gap-x-8 md:items-center">
					<SwitchContainer>
						<Switch
							id="batches"
							checked={isEnabled}
							onCheckedChange={setEnabled}
						/>
						<Label htmlFor="batches">Habilitar lotes</Label>
					</SwitchContainer>
					<AddLocation />
				</div>
			</header>
			<article className="grid grid-cols-3 gap-x-4">
				{locationsToAdd.map((location) => (
					<Location key={location.locationId} location={location} />
				))}
			</article>
		</CardBody>
	);
}
