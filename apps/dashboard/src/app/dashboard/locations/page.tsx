import { canCreateLocations } from "@kristall/client/services/location-services/use-cases/private/can-create-locations";
import { getLocations } from "@kristall/client/services/location-services/use-cases/private/get-locations";

import { Suspense } from "react";
import {
	AddLocation,
	AddLocationDisabled,
	AddLocationSkeleton,
} from "./components/add-location";
import { Locations, LocationsSkeleton } from "./components/locations";

export default function LocationsPage() {
	const locationsPromise = getLocations();
	const canCreateLocationPromise = canCreateLocations();

	return (
		<main className="p-8 h-layout overflow-y-scroll flex flex-col gap-y-4">
			<header className="flex justify-between items-center mb-4">
				<h3 className="text-2xl">Ubicaciones</h3>
				<Suspense fallback={<AddLocationSkeleton />}>
					<AddLocationButton
						canCreateLocationPromise={canCreateLocationPromise}
					/>
				</Suspense>
			</header>
			<Suspense fallback={<LocationsSkeleton />}>
				<Locations locationPromise={locationsPromise} />
			</Suspense>
		</main>
	);
}

async function AddLocationButton({
	canCreateLocationPromise,
}: {
	canCreateLocationPromise: Promise<boolean>;
}) {
	const canCreate = await canCreateLocationPromise;

	return canCreate ? <AddLocation /> : <AddLocationDisabled />;
}
