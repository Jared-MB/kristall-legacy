"use client";

import { useMemo } from "react";
import { useShoppingCartStore } from "../store/shopping-cart.store";
import Payment from "./payment";

export default function ShoppingCartResume() {
	const cart = useShoppingCartStore((state) => state.cart);

	const total = useMemo(() => {
		return cart.reduce(
			(acc, product) => acc + product.quantity * product.price,
			0,
		);
	}, [cart]);

	return (
		<footer className="flex flex-col gap-y-4">
			<div className="flex justify-between items-center">
				<span className="text-xl">Total:</span>
				<h5 className="text-3xl font-semibold">${total}</h5>
			</div>
			<Payment/>
		</footer>
	);
}
