import { buttonVariants } from "@/components/ui/button";
import type { Location as LocationType } from "@/types/location";
import { ExternalLink, MapPin, Warehouse } from "lucide-react";
import Link from "next/link";
import EditLocation from "./edit-location";

export default function Location({ data }: { data: LocationType }) {
	return (
		<article className="bg-zinc-800/30 shadow-md rounded-md p-6 flex flex-col gap-y-5">
			<h4 className="text-xl text-purple-500 flex items-center gap-x-2">
				{data.name === "Almacén" ? <Warehouse /> : <MapPin />}
				{data.name}
			</h4>
			<div className="grid grid-cols-2 px-4">
				<div>
					<h5 className="text-base text-zinc-400">Dirección</h5>
					<span className="text-lg">{data.address || "Sin dirección"}</span>
				</div>
				<div>
					<h5 className="text-base text-zinc-400">Teléfono</h5>
					<span className="text-lg">{data.phone ?? "Sin teléfono"}</span>
				</div>
			</div>
			<footer className="flex justify-between items-center">
				<EditLocation data={data} />
				<Link
					href={`/dashboard/inventory?page=1&location=${data._id}`}
					className={buttonVariants({
						variant: "link",
						className: "flex gap-x-2",
					})}
				>
					Ver inventario
					<ExternalLink className="w-4 h-4" />
				</Link>
			</footer>
		</article>
	);
}
