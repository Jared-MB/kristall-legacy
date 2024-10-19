"use client";

import { Card, CardBody } from "@/components/ui";
import { MapPin, Package } from "lucide-react";
import { useMemo } from "react";
import {
	LocationProvider,
	type LocationToAdd,
	useLocationsContext,
} from "../../context/location-context";

import type { LocationProduct } from "@/types/location";
import LocationOptions from "./location-options";

interface LocationProps {
	location: LocationToAdd | LocationProduct;
}

export default function Location({ location }: LocationProps) {
	const locations = useLocationsContext();

	const fullLocation = useMemo(() => {
		const locationResult = locations.find(
			(loc) => loc._id === location.locationId,
		);
		return locationResult;
	}, [location]);

	if (!fullLocation) return "No se encontró la ubicación";

	return (
		<LocationProvider value={location}>
			<Card as="div">
				<CardBody as="div">
					<header className="flex flex-row justify-between items-center">
						<h5 className="text-xl font-medium mb-2">{fullLocation?.name}</h5>
						<LocationOptions />
					</header>
					<span className="text-zinc-400 text-sm flex flex-row gap-x-1 items-center">
						<MapPin className="w-4 h-4" />
						{fullLocation.address ?? "Sin dirección"}
					</span>
					<span className="text-zinc-400 text-base flex flex-row gap-x-1 items-center">
						<Package className="w-4 h-4" />
						En stock: {location.stock}
					</span>
				</CardBody>
			</Card>
		</LocationProvider>
	);
}
