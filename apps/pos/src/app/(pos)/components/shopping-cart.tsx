"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useShoppingCartStore } from "../store/shopping-cart.store";

export default function ShoppingCart() {
	const { cart, clearCart, removeFromCart } = useShoppingCartStore();

	useEffect(() => {
		return () => clearCart();
	}, []);

	return (
		<section className="py-4 flex flex-col gap-y-1 overflow-y-scroll">
			{cart.map((product) => (
				<section
					key={product._id}
					className="flex items-center justify-between gap-x-4"
				>
					<div className="w-full">
						<div className="flex justify-between items-center gap-x-1">
							<h4 className="truncate">{product.name}</h4>
							<small className="text-zinc-400">${product.price}</small>
						</div>
						<div className="flex justify-between items-center">
							<small className="text-zinc-400">x{product.quantity}</small>
							<span>${product.quantity * product.price}</span>
						</div>
					</div>
					<button
						type="button"
						onClick={() => removeFromCart(product.productId)}
					>
						<X className="w-4 h-4 text-rose-400" />
					</button>
				</section>
			))}
		</section>
	);
}
