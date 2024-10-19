import { getLocations } from "@/actions/location.actions";
import AddLocation from "./components/add-location";
import Location from "./components/location";

export default async function LocationsPage() {
	const locations = await getLocations();

	if (!locations) return <div>Locations not found</div>;

	return (
		<main className="p-8 h-layout overflow-y-scroll flex flex-col gap-y-4">
			<header className="flex justify-between items-center mb-4">
				<h3 className="text-2xl">Ubicaciones</h3>
				<AddLocation />
			</header>
			<section className="grid md:grid-cols-2 gap-8">
				{locations.map((location) => (
					<Location key={location._id} data={location} />
				))}
			</section>
		</main>
	);
}
