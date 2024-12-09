import { locations } from "@kristall/core/modules/locations";
import { LocationsProvider } from "./context/location-context";

interface Props {
	children: React.ReactNode;
}

export default async function InventoryLayout({ children }: Props) {
	const allLocations = await locations.getLocations();

	return (
		<LocationsProvider value={allLocations ?? []}>{children}</LocationsProvider>
	);
}
