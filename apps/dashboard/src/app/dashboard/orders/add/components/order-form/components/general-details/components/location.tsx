"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui";
import { useFormContext } from "react-hook-form";

export default function Location({
	locations,
}: {
	locations: { _id: string; name: string }[];
}) {
	const { setValue } = useFormContext();

	return (
		<Select onValueChange={(value) => setValue("location", value)}>
			<SelectTrigger>
				<SelectValue placeholder="Seleccionar ubicación" />
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
