import type {
	CatalogProduct,
	ProductOrder,
} from "@/core/services/product/interfaces";

import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useShoppingCartStore = create(
	combine(
		{
			cart: [] as ProductOrder[],
		},
		(set) => ({
			addToCart: (product: CatalogProduct) =>
				set(({ cart }) => {
					const newCart = structuredClone(cart);

					const isProductInCart = newCart.find(
						(cartProduct) => cartProduct.productId === product._id,
					);
					if (!isProductInCart) {
						newCart.push({
							productId: product._id,
							code: product.code,
							quantity: 1,
							total: product.price,
							name: product.name,
							price: product.price,
						});
					} else {
						const index = newCart.findIndex(
							(cartProduct) => cartProduct.productId === product._id,
						);
						newCart[index].quantity += 1;
					}

					return {
						cart: newCart,
					};
				}),
			removeFromCart: (id: string) =>
				set(({ cart }) => {
					let newCart: ProductOrder[] = structuredClone(cart);
					const productQuantity =
						cart.find((product) => product.productId === id)?.quantity || 0;

					if (productQuantity > 1) {
						const index = newCart.findIndex(
							(product) => product.productId === id,
						);
						newCart[index].quantity -= 1;
					} else {
						newCart = cart.filter((product) => product.productId !== id);
					}

					return {
						cart: newCart,
					};
				}),
			clearCart: () => set(() => ({ cart: [] })),
		}),
	),
);
