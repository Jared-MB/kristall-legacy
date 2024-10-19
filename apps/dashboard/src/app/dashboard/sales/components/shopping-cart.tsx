"use client";

import { useCartStore } from "@/core/store";
import RemoveProduct from "./remove-product";

export default function ShoppingCart() {
	const cart = useCartStore((state) => state.cart);

	return (
		<section className="flex flex-col gap-y-3 h-[calc(52dvh)] overflow-y-scroll pr-4 border-y border-y-zinc-700 py-4">
			{cart.map((product) => (
				<div
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
					<RemoveProduct productId={product._id} quantity={product.quantity} />
				</div>
			))}
		</section>
	);
}
