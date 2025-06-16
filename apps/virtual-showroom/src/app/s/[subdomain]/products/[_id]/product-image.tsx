// import { unstable_ViewTransition as ViewTransition } from "react";

import { NoImage } from "@/components/no-image";
import type { PublicProduct } from "@kristall/core/interfaces/products";
import { Badge } from "@kristall/ui/badge";
import { Card, CardBody } from "@kristall/ui/card";
import { Skeleton } from "@kristall/ui/skeleton";

export function ProductImage({
	_id,
	image,
	name,
	isAvailable,
}: Pick<PublicProduct, "isAvailable" | "_id" | "name" | "image">) {
	return (
		<Card className="overflow-hidden">
			<CardBody className="p-0">
				{/* <ViewTransition name={`product-${_id}-image`}> */}
					<div className="aspect-square relative bg-gray-50">
						{image?.url ? (
							<img
								src={image?.url || "/placeholder.svg"}
								alt={`${name} product`}
								className="object-cover aspect-square w-full h-full"
							/>
						) : (
							<NoImage />
						)}
						{!isAvailable && (
							<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
								<Badge variant="secondary" className="text-lg px-4 py-2">
									Out of Stock
								</Badge>
							</div>
						)}
					</div>
				{/* </ViewTransition> */}
			</CardBody>
		</Card>
	);
}

export function ProductImageSkeleton() {
	return (
		<Card className="overflow-hidden">
			<CardBody className="p-0">
				<div className="aspect-square relative">
					<Skeleton className="object-cover aspect-square w-full h-full" />
				</div>
			</CardBody>
		</Card>
	);
}
