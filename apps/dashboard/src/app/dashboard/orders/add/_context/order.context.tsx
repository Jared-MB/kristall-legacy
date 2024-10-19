"use client";

import type { CatalogProduct, Customer } from "@/core/interfaces/entities";
import { createContext, useContext } from "react";

interface ContextProps {
	products: CatalogProduct[];
	clients: Customer[];
}

export const OrderContext = createContext({} as ContextProps);

export default function OrderContextProvider({
	children,
	value,
}: { children: React.ReactNode; value: ContextProps }) {
	return (
		<OrderContext.Provider value={value}>{children}</OrderContext.Provider>
	);
}

export const useOrderContext = () => {
	return useContext(OrderContext);
};
