"use client";

import { useCartStore } from "@/core/store";
import ShoppingCartPayment from "./shopping-cart-payment";

export default function ShoppingCartSummary() {
	const cart = useCartStore((state) => state.cart);

	const total = cart.reduce((acc, product) => {
		return acc + product.price * product.quantity;
	}, 0);

	return (
		<footer className="pt-4 pr-4 flex flex-col gap-y-4">
			<h5 className="flex items-center justify-between">
				<span className="text-zinc-400 text-lg">Total:</span>{" "}
				<span className="text-3xl text-purple-500">${total}</span>
			</h5>
			<ShoppingCartPayment total={total} />
		</footer>
	);
}
