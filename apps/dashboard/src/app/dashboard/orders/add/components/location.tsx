import { getLocations } from "@kristall/core/locations/get";

import { SearchSelect } from "@kristall/ui/functional/search-select";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

export async function Location() {
	const locations = await getLocations();

	if (!locations || locations.length === 0) {
		return <div>No se encontraron ubicaciones</div>;
	}

	return (
		<SearchSelect name="location" defaultValue={locations[0]._id}>
			<SelectTrigger className="w-[180px]">
				<SelectValue placeholder="Selecciona una ubicación" />
			</SelectTrigger>
			<SelectContent>
				{locations.map((location) => (
					<SelectItem key={location._id} value={location._id}>
						{location.name}
					</SelectItem>
				))}
			</SelectContent>
		</SearchSelect>
	);
}

export async function DeliveryLocation() {
	const locations = await getLocations();

	if (!locations || locations.length === 0) {
		return <div>No se encontraron ubicaciones</div>;
	}

	return (
		<Select name="delivery">
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Selecciona una ubicación" />
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
