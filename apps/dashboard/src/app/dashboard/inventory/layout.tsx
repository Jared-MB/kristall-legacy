import { getLocations } from "@/actions/location.actions";
import { LocationsProvider } from "./context/location-context";

interface Props {
	children: React.ReactNode;
}

export default async function InventoryLayout({ children }: Props) {
	const locations = await getLocations();

	return (
		<LocationsProvider value={locations ?? []}>{children}</LocationsProvider>
	);
}
