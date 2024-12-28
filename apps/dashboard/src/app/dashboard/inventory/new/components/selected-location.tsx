"use client";

import type { Location } from "@kristall/core/interfaces/locations";
import { Input } from "@kristall/ui/input";
import { Warehouse } from "lucide-react";
import { use, useEffect, useState } from "react";
import { LocationsContext } from "../../context/location-context";
import { useNewInventoryStore } from "../store/useNewInventoryStore";

export function SelectedLocation() {
	const locations = use(LocationsContext);

	const setLocation = useNewInventoryStore((state) => state.setLocation);
	const [selectedLocation, setSelectedLocation] = useState<Location | null>(
		null,
	);

	useEffect(() => {
		const location =
			locations.find((location) => location.name === "Almacén") ?? locations[0];
		setSelectedLocation(location);
		setLocation(location);
	}, [locations]);

	return (
		<div className="max-w-xs">
			<Input
				icon={<Warehouse />}
				disabled
				readOnly
				defaultValue={selectedLocation?.name}
				className="disabled:opacity-100"
			/>
		</div>
	);
}
