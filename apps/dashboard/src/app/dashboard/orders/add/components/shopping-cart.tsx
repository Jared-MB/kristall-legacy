"use client";

import type { ShoppingCartProduct } from "@kristall/core/interfaces/products";

import { create } from "zustand";

import { Button } from "@kristall/ui/button";

import { ScrollArea } from "@kristall/ui/scroll-area";
import { Separator } from "@kristall/ui/separator";
import { Minus, Plus, X } from "lucide-react";

export interface ShoppingCartState {
	products: Map<string, ShoppingCartProduct>;
	addProduct: (productToAdd: ShoppingCartProduct) => void;
	removeProduct: (id: string, all?: boolean) => void;
}

export const useShoppingCart = create<ShoppingCartState>()((set) => ({
	products: new Map(),
	addProduct: (productToAdd: ShoppingCartProduct) =>
		set((state) => {
			const product = state.products.get(productToAdd._id);

			if (product) {
				let quantity = product.quantity + 1;
				const stock = product.stock;

				if (stock < quantity) {
					quantity = stock;
				}

				return {
					products: state.products.set(productToAdd._id, {
						...productToAdd,
						quantity,
					}),
				};
			}

			return {
				products: state.products.set(productToAdd._id, productToAdd),
			};
		}),
	removeProduct: (id: string, all = false) =>
		set((state) => {
			const product = state.products.get(id);

			if (!product) {
				return {
					products: state.products,
				};
			}

			if (all) {
				state.products.delete(id);
			}

			product.quantity--;
			if (product.quantity <= 0) {
				state.products.delete(id);
			}

			return {
				products: state.products,
			};
		}),
}));

export function ShoppingCart() {
	const {
		products: productsState,
		removeProduct,
		addProduct,
	} = useShoppingCart();

	const products = Array.from(productsState.values());

	const total = products.reduce(
		(acc, product) => acc + product.quantity * product.price,
		0,
	);

	return (
		<div className="gap-y-6 h-full flex flex-col">
			<ScrollArea className="h-[65dvh]">
				<div className="flex flex-col gap-y-4 p-6">
					{products.map((product) => (
						<div key={product._id} className="flex flex-col gap-y-2">
							<h5 className="font-medium truncate" title={product.name}>
								{product.name}
							</h5>
							<div className="flex justify-between items-center">
								<div className="flex flex-col gap-1">
									<div className="flex gap-x-1 items-center text-sm text-zinc-300">
										<span>${product.price}</span>
										<span>x</span>
										<span>{product.quantity}</span>
									</div>
									<span className="text-lg font-medium">
										${product.price * product.quantity}
									</span>
								</div>
								<div className="flex items-center gap-2">
									<Button
										size="icon"
										className="size-8"
										variant="outline"
										onClick={() => removeProduct(product._id)}
									>
										<Minus className="size-4" />
									</Button>
									{product.quantity}
									<Button
										size="icon"
										className="size-8"
										variant="outline"
										onClick={() => addProduct(product)}
									>
										<Plus className="size-4" />
									</Button>
									<Button
										size="icon"
										className="size-8"
										variant="destructive"
										onClick={() => removeProduct(product._id, true)}
									>
										<X className="size-4" />
									</Button>
								</div>
							</div>
						</div>
					))}
				</div>
			</ScrollArea>
			<Separator />
			<footer className="px-6 pb-6 flex justify-end items-center grow gap-x-4">
				<span className="text-lg text-zinc-400">Total:</span>
				<span className="text-3xl font-medium">${total}</span>
			</footer>
		</div>
	);
}
