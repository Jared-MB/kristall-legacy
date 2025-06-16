import type { Location as LT } from "@kristall/core/interfaces/locations";
import type { PublicProduct } from "@kristall/core/interfaces/products";
import { getPublicLocations } from "@kristall/core/locations/public";

import { Badge } from "@kristall/ui/badge";
import { Card, CardBody } from "@kristall/ui/card";
import { Skeleton } from "@kristall/ui/skeleton";
import { cn } from "@kristall/ui/utils/cn";

export async function AvailableLocations({
	locations,
	subdomain,
}: Pick<PublicProduct, "locations"> & { subdomain: string }) {
	const shopLocations = await getPublicLocations(subdomain);

	if (!shopLocations) {
		return null;
	}

	return (
		<Card>
			<CardBody className="p-4 space-y-3">
				<h3 className="font-semibold">Available Locations</h3>
				<div className="space-y-2 text-sm">
					{locations.map((location) => (
						<Location
							key={location._id}
							location={location}
							locations={shopLocations}
						/>
					))}
				</div>
			</CardBody>
		</Card>
	);
}

export function Location({
	location,
	locations,
}: {
	location: Pick<PublicProduct, "locations">["locations"][number];
	locations: LT[];
}) {
	const locationData = locations.find((l) => l._id === location.locationId);

	return (
		<div
			className={cn(
				"flex items-center justify-between p-2 rounded-lg",
				location.stock > 0 ? "bg-green-50" : "bg-gray-50",
			)}
		>
			<div>
				<div className="font-medium">{locationData?.name}</div>
				<div className="text-muted-foreground text-xs">
					{locationData?.address || "No address provided"}
				</div>
			</div>
			<StockBadge isAvailable={location.stock > 0} />
		</div>
	);
}

function StockBadge({ isAvailable }: { isAvailable: boolean }) {
	if (isAvailable) {
		return (
			<Badge
				variant="default"
				className="bg-green-600 hover:bg-green-500 text-white"
			>
				In Stock
			</Badge>
		);
	}

	return <Badge variant="secondary">Out of Stock</Badge>;
}

export function AvailableLocationsSkeleton() {
	return (
		<Card>
			<CardBody className="p-4 space-y-3">
				<h3 className="font-semibold">Available Locations</h3>
				<div className="space-y-2 text-sm">
					{Array(2)
						.fill(null)
						.map((_, i) => (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={i}
								className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
							>
								<div className="space-y-1">
									<div className="font-medium">
										<Skeleton className="h-5 w-32" />
									</div>
									<div className="text-muted-foreground text-xs">
										<Skeleton className="h-4 w-28" />
									</div>
								</div>
								<Badge variant="outline">
									<Skeleton className="h-5 w-20 opacity-50" />
								</Badge>
							</div>
						))}
				</div>
			</CardBody>
		</Card>
	);
}
