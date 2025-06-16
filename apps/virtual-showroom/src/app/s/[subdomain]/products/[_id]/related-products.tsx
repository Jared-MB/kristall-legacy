import { getPublicRelatedProducts } from "@kristall/core/products/public";
import { ScrollArea, ScrollBar } from "@kristall/ui/scroll-area";

import Link from "next/link";
import { ProductImage, ProductImageSkeleton } from "./product-image";

export async function RelatedProducts({
	subdomain,
	productId,
}: { subdomain: string; productId: string }) {
	const products = await getPublicRelatedProducts(subdomain, productId);

	if (!products || products.length === 0) return null;

	return (
		<div className="space-y-4">
			<h2 className="font-semibold text-2xl">Productos relacionados</h2>
			<ScrollArea className="max-w-6xl rounded-md whitespace-nowrap">
				<div className="flex w-max space-x-4 pb-4">
					{products.map((product) => (
						<Link
							href={`/products/${product._id}`}
							className="w-52 max-w-52 space-y-2"
							key={product._id}
						>
							<div className="relative overflow-hidden rounded-lg">
								<div className="aspect-square w-full hover:scale-105 duration-300">
									<ProductImage key={product._id} {...product} />
								</div>
							</div>
							<div>
								<h3 className="font-semibold truncate capitalize">
									{product.name}
								</h3>
								<p className="text-sm text-gray-700">${product.price}</p>
							</div>
						</Link>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
		</div>
	);
}

export function RelatedProductsSkeleton() {
	return (
		<div className="space-y-4">
			<h2 className="font-semibold text-2xl">Productos relacionados</h2>
			<ScrollArea className="max-w-6xl rounded-md whitespace-nowrap">
				<div className="flex w-max space-x-4 pb-4">
					{Array.from({ length: 6 }).map((_, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<div key={index} className="w-52 max-w-52 space-y-2">
							<div className="relative overflow-hidden rounded-lg">
								<div className="aspect-square w-full hover:scale-105 duration-300">
									<ProductImageSkeleton />
								</div>
							</div>
						</div>
					))}
				</div>
				{/* <ScrollBar orientation="horizontal" /> */}
			</ScrollArea>
		</div>
	);
}
