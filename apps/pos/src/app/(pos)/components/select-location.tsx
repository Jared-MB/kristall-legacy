"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { LocationSummary } from "@/core/services/location/interfaces";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SelectLocation({
	locations,
}: {
	locations: LocationSummary[];
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const { replace } = useRouter();

	const handleLocationChange = (value: string) => {
		const query = new URLSearchParams(searchParams);
		query.set("location", value);
		replace(`?${query.toString()}`);
	};

	useEffect(() => {
		if (
			!searchParams.get("location") &&
			(pathname === "/" || pathname === "/orders")
		) {
			const query = new URLSearchParams(searchParams);
			query.set("location", locations[0]._id);
			replace(`${pathname}?${query.toString()}`);
		}
	}, [locations, pathname]);

	return (
		<Select
			defaultValue={searchParams.get("location") ?? locations[0]._id}
			onValueChange={handleLocationChange}
		>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Selecciona tu ubicación" />
			</SelectTrigger>
			<SelectContent>
				{locations.map((location) => (
					<SelectItem key={location._id} value={location._id}>
						{location.name}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
