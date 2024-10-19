"use client";

import { Card, CardBody, CardHeader } from "@/components/ui";
import type { ProductBatch } from "@/types/batch";
import { format } from "@formkit/tempo";
import { Calendar, MapPin, Package } from "lucide-react";
import { BatchProvider, type BatchToAdd } from "../../context/batch-context";
import { useLocationsContext } from "../../context/location-context";
import BatchOptions from "./batch-options";

interface BatchProps {
	batch: ProductBatch | BatchToAdd;
	index: number;
}

export default function Batch({ batch, index }: BatchProps) {
	const locations = useLocationsContext();
	const location = locations.find(
		(location) => location._id === batch.locationProduct.locationId,
	);

	if (!location) {
		return null;
	}

	return (
		<BatchProvider value={batch}>
			<Card as="div">
				<CardBody as="div">
					<CardHeader className="p-0 pb-4 flex-row justify-between items-center">
						<h6 className="text-lg">Lote #{index}</h6>
						<BatchOptions />
					</CardHeader>
					<div className="grid grid-cols-3 text-zinc-400 text-sm">
						<div className="flex flex-row items-center gap-x-1">
							<Package className="w-5 h-5" />
							Stock: {batch.stock}
						</div>
						<div className="flex flex-row items-center gap-x-1">
							<MapPin className="w-5 h-5" />
							Ubicación: {location.name}
						</div>
						<div className="flex flex-row items-center gap-x-1">
							<Calendar className="w-5 h-5" />
							Expiración: {format(batch.expirationDate, "DD/MM/YYYY")}
						</div>
					</div>
				</CardBody>
			</Card>
		</BatchProvider>
	);
}
