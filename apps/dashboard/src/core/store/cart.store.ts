import type { CartProduct } from "@/types/product";
import { create } from "zustand";
import { combine } from "zustand/middleware";

export const useCartStore = create(
	combine(
		{
			cart: [] as CartProduct[],
		},
		(set) => ({
			addProductToCart: (product: CartProduct) =>
				set((state) => ({ cart: [...state.cart, product] })),
			removeProductFromCart: (productId: string) =>
				set((state) => ({
					cart: state.cart.filter((p) => p._id !== productId),
				})),
			addProductQuantity: (productId: string) =>
				set((state) => ({
					cart: state.cart.map((p) =>
						p._id === productId ? { ...p, quantity: p.quantity + 1 } : p,
					),
				})),
			removeProductQuantity: (productId: string) =>
				set((state) => ({
					cart: state.cart.map((p) =>
						p._id === productId ? { ...p, quantity: p.quantity - 1 } : p,
					),
				})),
			clearCart: () => set({ cart: [] }),
		}),
	),
);
