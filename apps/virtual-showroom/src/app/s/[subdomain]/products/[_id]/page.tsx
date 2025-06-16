import { Header } from "@/components/header";

import { getPublicProductById } from "@kristall/core/products/public";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AvailableLocations } from "./available-locations";
import { ProductActions } from "./product-actions";
import { ProductImage } from "./product-image";
import { ProductInformation } from "./product-information";
import { RelatedProducts, RelatedProductsSkeleton } from "./related-products";

export default async function ProductPage({
	params,
}: { params: Promise<{ subdomain: string; _id: string }> }) {
	const { _id, subdomain } = await params;

	const product = await getPublicProductById(subdomain, _id);

	if (!product) {
		notFound();
	}

	return (
		<>
			<Header shopName={subdomain} />
			<div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
				<div className="grid md:grid-cols-2 gap-8">
					<ProductImage {...product} />
					<div className="space-y-6">
						<ProductInformation {...product} />
						<ProductActions
							isAvailable={product.isAvailable}
							_id={product._id}
						/>
						<div className="space-y-4">
							<AvailableLocations
								locations={product.locations}
								subdomain={subdomain}
							/>
						</div>
					</div>
				</div>
				<Suspense fallback={<RelatedProductsSkeleton />}>
					<RelatedProducts subdomain={subdomain} productId={product._id} />
				</Suspense>
			</div>
		</>
	);
}
