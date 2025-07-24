"use client";

import { useEffect, useState } from "react";

import { useQueryParams } from "@kristall/client/hooks/use-query-params";
import type { Location } from "@kristall/shared/domains/location-services/types";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

export function LocationsFilter({ locations }: { locations: Location[] }) {
	const [selectedLocation, setSelectedLocation] = useState("");

	const { setQueryParams, removeQueryParams, getQueryParam } =
		useQueryParams<"location">();

	const onChange = (value: string) => {
		setQueryParams("location", value);
		if (value === "all") removeQueryParams("location");
		setSelectedLocation(value);
	};

	useEffect(() => {
		const location = getQueryParam("location");
		location && setSelectedLocation(location);
	}, []);

	return (
		<Select onValueChange={onChange} value={selectedLocation}>
			<SelectTrigger className="w-[180px]">
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
	);
}
