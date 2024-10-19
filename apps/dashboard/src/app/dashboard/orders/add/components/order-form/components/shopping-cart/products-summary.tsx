"use client";

import RemoveProduct from "@/app/dashboard/sales/components/remove-product";
import { useCartStore } from "@/core/store";

export default function ShoppingCartProductsSummary() {
	const cart = useCartStore((state) => state.cart);

	const total = cart.reduce((acc, product) => {
		return acc + product.price * product.quantity;
	}, 0);

	return (
		<aside className="h-full flex flex-col justify-between">
			<div>
				<header className="mb-4">
					<h3 className="text-xl font-medium">Carrito de compras</h3>
				</header>
				<section className="flex flex-col gap-y-3">
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
							<RemoveProduct
								productId={product._id}
								quantity={product.quantity}
							/>
						</div>
					))}
				</section>
			</div>
			<footer className="pt-4 pr-4 flex flex-col gap-y-4">
				<h5 className="flex items-center justify-between">
					<span className="text-zinc-400 text-lg">Total:</span>{" "}
					<span className="text-3xl text-purple-500">${total}</span>
				</h5>
			</footer>
		</aside>
	);
}
