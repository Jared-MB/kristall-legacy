"use client";

import ImageSVG from "@/components/svg/image";
import type { CatalogProduct } from "@/core/services/product/interfaces";

import { useShoppingCartStore } from "../store/shopping-cart.store";

export default function ProductButton({
	product,
}: {
	product: CatalogProduct;
}) {
	const { image, name } = product;
	const addToCart = useShoppingCartStore((state) => state.addToCart);

	return (
		<button
			type="button"
			onClick={() => addToCart(product)}
			className="overflow-hidden rounded-md mb-2 w-full aspect-square object-cover disabled:opacity-50 disabled:pointer-events-none"
		>
			{image?.url ? (
				<img
					className="active:scale-105 transition-transform duration-300 ease-in-out scale-[1.01] hover:scale-110 object-cover object-center aspect-square w-full h-auto"
					src={image?.url}
					alt={name}
					loading="lazy"
				/>
			) : (
				<ImageSVG className="active:scale-105 transition-transform duration-300 ease-in-out scale-[1.01] hover:scale-110 object-cover object-center aspect-square w-full h-auto" />
			)}
		</button>
	);
}
