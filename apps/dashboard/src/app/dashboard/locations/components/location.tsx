import type { Location } from "@kristall/shared/domains/location-services/types";

import { ExternalLink, MapPin, Warehouse } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@kristall/ui/button";

import { Skeleton } from "@kristall/ui/skeleton";
import { EditLocation } from "./edit-location";

export function ShopLocation({ location }: { location: Location }) {
	return (
		<article className="bg-zinc-800/30 shadow-md rounded-md p-6 flex flex-col gap-y-5">
			<h4 className="text-xl text-purple-500 flex items-center gap-x-2">
				{location.name === "Almacén" ? <Warehouse /> : <MapPin />}
				{location.name}
			</h4>
			<div className="grid grid-cols-2 px-4">
				<div>
					<h5 className="text-base text-zinc-400">Dirección</h5>
					<span className="text-lg">
						{location?.address || "Sin dirección"}
					</span>
				</div>
				<div>
					<h5 className="text-base text-zinc-400">Teléfono</h5>
					<span className="text-lg">{location?.phone ?? "Sin teléfono"}</span>
				</div>
			</div>
			<footer className="flex justify-between items-center">
				<EditLocation data={location} />
				<Link
					href={`/dashboard/inventory?page=1&location=${location._id}`}
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

export function ShopLocationSkeleton() {
	return (
		<article className="bg-zinc-800/30 shadow-md rounded-md p-6 flex flex-col gap-y-5">
			<h4 className="text-xl text-purple-500 flex items-center gap-x-2">
				<MapPin />
				<Skeleton className="w-24 h-6" />
			</h4>
			<div className="grid grid-cols-2 px-4">
				<div>
					<h5 className="text-base text-zinc-400 mb-2">Dirección</h5>
					<span className="text-lg">
						<Skeleton className="w-24 h-5" />
					</span>
				</div>
				<div>
					<h5 className="text-base text-zinc-400 mb-2">Teléfono</h5>
					<span className="text-lg">
						<Skeleton className="w-24 h-5" />
					</span>
				</div>
			</div>
			<footer className="flex justify-between items-center">
				<Button variant="outline" disabled>
					Editar ubicación
				</Button>
				<Button
					disabled
					variant="link"
					className={buttonVariants({
						variant: "link",
						className: "flex gap-x-2",
					})}
				>
					Ver inventario
					<ExternalLink className="w-4 h-4" />
				</Button>
			</footer>
		</article>
	);
}
