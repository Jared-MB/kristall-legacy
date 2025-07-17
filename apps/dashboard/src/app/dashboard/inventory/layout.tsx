import { getLocations } from "@kristall/core/locations/get";
import { LocationsProvider } from "./context/location-context";

interface Props {
	children: React.ReactNode;
}

export default async function InventoryLayout({ children }: Props) {
	const allLocations = getLocations();

	return <LocationsProvider value={allLocations}>{children}</LocationsProvider>;
}
