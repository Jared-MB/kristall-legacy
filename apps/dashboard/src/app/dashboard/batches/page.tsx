import { getBatches } from "@/actions/products";
import BatchesCalendar from "./components/batches-calendar";

export default async function BatchesPage() {
	const batches = await getBatches();

	const mappedBatches = Object.entries(batches).map(([date, batches]) => ({
		date: new Date(date),
		info: batches,
	}));

	return <BatchesCalendar batches={mappedBatches} />;
}
