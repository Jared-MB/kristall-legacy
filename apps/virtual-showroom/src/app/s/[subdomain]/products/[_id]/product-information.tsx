// import { unstable_ViewTransition as ViewTransition } from "react";

import type { PublicProduct } from "@kristall/core/interfaces/products";
import { Badge } from "@kristall/ui/badge";
import { Skeleton } from "@kristall/ui/skeleton";
import { GoBack } from "./go-back";

export function ProductInformation({
	_id,
	category,
	name,
	price,
	isAvailable,
}: Pick<PublicProduct, "category" | "_id" | "name" | "isAvailable" | "price">) {
	return (
		<>
		{/* <ViewTransition name={`product-${_id}-info`}> */}
			<div className="flex justify-between">
				<div className="space-y-2">
					<Badge variant="outline" className="w-fit">
						{category.name}
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight capitalize">
						{name}
					</h1>
				</div>
				<div>
					<GoBack />
				</div>
			</div>

			<div className="flex items-center gap-4">
				<div className="text-3xl font-bold text-[var(--vs-custom-500)]">
					${price.toFixed(2)}
				</div>
				<Badge
					variant={isAvailable ? "default" : "secondary"}
					className="text-sm text-white bg-[var(--vs-custom-500)] hover:bg-[var(--vs-custom-400)]"
				>
					{isAvailable ? "In Stock" : "Out of Stock"}
				</Badge>
			</div>
		{/* </ViewTransition> */}
		</>
	);
}

export function ProductInformationSkeleton() {
	return (
		<>
			<div className="flex justify-between">
				<div className="space-y-2">
					<Badge variant="outline" className="w-fit">
						<Skeleton className="h-4 w-8 opacity-50" />
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight capitalize">
						<Skeleton className="h-8 w-48" />
					</h1>
				</div>
				<div>
					<GoBack />
				</div>
			</div>

			<div className="flex items-center gap-4">
				<div className="text-3xl font-bold text-[var(--vs-custom-500)]">
					<Skeleton className="h-8 w-32" />
				</div>
				<Badge
					variant="default"
					className="text-sm text-white bg-[var(--vs-custom-500)] hover:bg-[var(--vs-custom-400)]"
				>
					In Stock
				</Badge>
			</div>
		</>
	);
}
