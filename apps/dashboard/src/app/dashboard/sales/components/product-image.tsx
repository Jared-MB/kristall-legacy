"use client";

import NoImage from "@/components/svg/no-image";
import { useCartStore } from "@/core/store";
import type { CartProduct, CatalogProduct } from "@/types/product";

export default function ProductImage({ product }: { product: CatalogProduct }) {
	const cart = useCartStore((state) => state.cart);
	const addProductToCart = useCartStore((state) => state.addProductToCart);
	const addProductQuantity = useCartStore((state) => state.addProductQuantity);

	const handleClick = () => {
		const productInCart = cart.find((p) => p._id === product._id);

		if (productInCart) {
			if (product.stock <= productInCart.quantity) {
				return;
			}
			addProductQuantity(productInCart._id);
			return;
		}

		const cartProduct: CartProduct = {
			_id: product._id,
			name: product.name,
			price: product.price,
			code: product.code,
			quantity: 1,
			cost: product.cost ?? 0,
		};
		addProductToCart(cartProduct);
	};

	return (
		<button
			type="button"
			onClick={handleClick}
			className="overflow-hidden rounded-md mb-2 w-full aspect-square object-cover"
		>
			{product.image?.url ? (
				<img
					loading="lazy"
					src={product.image?.url}
					alt={`Imagen de referencia a ${product.name}`}
					className="active:scale-105 transition-transform duration-300 ease-in-out scale-[1.01] hover:scale-110 object-cover object-center aspect-square w-full h-auto"
				/>
			) : (
				<NoImage />
			)}
		</button>
	);
}
