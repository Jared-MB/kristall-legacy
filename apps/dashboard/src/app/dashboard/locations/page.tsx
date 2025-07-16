import { canCreateLocations } from "@kristall/client/services/location-services/use-cases/private/can-create-locations";
import { getLocations } from "@kristall/client/services/location-services/use-cases/private/get-locations";

import { AddLocation, AddLocationDisabled } from "./components/add-location";
import { ShopLocation } from "./components/location";

export default async function LocationsPage() {
	const [locations, canCreate] = await Promise.all([
		getLocations(),
		canCreateLocations(),
	]);

	if (!locations) return <div>Locations not found</div>;

	return (
		<main className="p-8 h-layout overflow-y-scroll flex flex-col gap-y-4">
			<header className="flex justify-between items-center mb-4">
				<h3 className="text-2xl">Ubicaciones</h3>
				{canCreate ? <AddLocation /> : <AddLocationDisabled />}
			</header>
			<section className="grid md:grid-cols-2 gap-8">
				{locations.map((location) => (
					<ShopLocation key={location._id} location={location} />
				))}
			</section>
		</main>
	);
}
