import type { NewInventoryProduct } from "@kristall/core/interfaces/inventory";
import type { Location } from "@kristall/core/interfaces/locations";

import { create } from "zustand";
import { combine, createJSONStorage, persist } from "zustand/middleware";

export const useNewInventoryStore = create(
	persist(
		combine(
			{
				products: new Map<string, NewInventoryProduct>(),
				location: {} as Location,
			},
			(set) => ({
				addProduct: (productToInsert: NewInventoryProduct) =>
					set((state) => {
						const product = state.products.get(productToInsert._id);
						if (product) {
							const updatedProduct = {
								...product,
								stock: product.stock + 1,
							};

							return {
								products: new Map(state.products).set(
									updatedProduct._id,
									updatedProduct,
								),
							};
						}

						const newProduct: NewInventoryProduct = {
							...productToInsert,
							locations: [
								{
									locationId: state.location._id,
									_id: "no-used",
									stock: 0,
									productId: productToInsert._id,
								},
							],
						};

						return {
							products: new Map(state.products).set(newProduct._id, newProduct),
						};
					}),
				setLocation: (location: Location) =>
					set(() => {
						return {
							location,
						};
					}),
				clear: () => set(() => ({ products: new Map() })),
			}),
		),
		{
			name: "new-inventory-store",
			storage: createJSONStorage(() => localStorage, {
				reviver: (_key, value) => {
					if (
						value &&
						typeof value === "object" &&
						(value as any)?.type === "map"
					) {
						return new Map(Object.entries((value as any).value));
					}
					return value;
				},
				replacer: (_key, value) => {
					if (value instanceof Map) {
						return { type: "map", value: Object.fromEntries(value.entries()) };
					}
					return value;
				},
			}),
		},
	),
);
