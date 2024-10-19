"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocationsContext } from "../context/location-context";

export default function LocationsFilter() {
	const locations = useLocationsContext();

	const [selectedLocation, setSelectedLocation] = useState("");

	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const onChange = (value: string) => {
		const query = new URLSearchParams(searchParams);
		query.set("location", value);
		if (value === "all") query.delete("location");
		replace(`${pathname}?${query.toString()}`);
		setSelectedLocation(value);
	};

	useEffect(() => {
		const query = new URLSearchParams(searchParams);
		const location = query.get("location");
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
