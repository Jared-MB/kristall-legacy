import { wait } from "@kristall/core/utils/wait";
import type { PrivateLocation } from "@kristall/shared/domains/location-services/types";
import { ShopLocation, ShopLocationSkeleton } from "./location";

export async function Locations({
	locationPromise,
}: { locationPromise: Promise<PrivateLocation[] | undefined> }) {
	const locations = await locationPromise;
	await wait(2000);

	if (!locations) return <div>Locations not found</div>;

	return (
		<section className="grid md:grid-cols-2 gap-8">
			{locations.map((location) => (
				<ShopLocation key={location._id} location={location} />
			))}
		</section>
	);
}

export async function LocationsSkeleton() {
	return (
		<section className="grid md:grid-cols-2 gap-8">
			{Array.from({ length: 4 }).map((_, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: No need to a fancy key since its only a skeleton
				<ShopLocationSkeleton key={index} />
			))}
		</section>
	);
}
