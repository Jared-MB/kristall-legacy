import { Header } from "@/components/header";
import { AvailableLocationsSkeleton } from "./available-locations";
import { ProductActionsSkeleton } from "./product-actions";
import { ProductImageSkeleton } from "./product-image";
import { ProductInformationSkeleton } from "./product-information";
import { RelatedProductsSkeleton } from "./related-products";

export default function ProductIdLoading() {
	return (
		<>
			<Header shopName="" />
			<div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
				<div className="grid md:grid-cols-2 gap-8">
					<ProductImageSkeleton />
					<div className="space-y-6">
						<ProductInformationSkeleton />
						<ProductActionsSkeleton />
						<div className="space-y-4">
							<AvailableLocationsSkeleton />
						</div>
					</div>
				</div>
				<RelatedProductsSkeleton />
			</div>
		</>
	);
}
