"use client";

import { InputContainer } from "@/components/ui";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import type { Location, LocationSummary } from "@/types/location";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function SelectLocations({
	locations,
	setSelectedValue,
}: {
	locations: LocationSummary[] | Location[];
	setSelectedValue?: (value: string) => void;
}) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const handleLocationChange = (value: string) => {
		setSelectedValue?.(value);
		const query = new URLSearchParams(searchParams);
		query.set("location", value);
		replace(`${pathname}?${query.toString()}`);
	};

	useEffect(() => {
		if (!searchParams.get("location")) {
			const query = new URLSearchParams(searchParams);
			query.set("location", locations[0]?._id);
			setSelectedValue?.(locations[0]?._id);
			replace(`${pathname}?${query.toString()}`);
		} else {
			setSelectedValue?.(searchParams.get("location") ?? locations[0]?._id);
		}
	}, []);

	return (
		<InputContainer>
			<Label htmlFor="location">Ubicación</Label>
			<Select
				// id="location"
				defaultValue={searchParams.get("location") ?? locations[0]?._id}
				onValueChange={handleLocationChange}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Selecciona una ubicación" />
				</SelectTrigger>
				<SelectContent>
					{locations?.map((location) => (
						<SelectItem key={location._id} value={location._id}>
							{location.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</InputContainer>
	);
}
