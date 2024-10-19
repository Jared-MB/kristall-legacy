"use client";

import { createContext, useContext } from "react";

export type PaymentMethod = "cash" | "card" | "transfer";

export const PaymentMethodContext = createContext<PaymentMethod>("cash");

export const PaymentMethodProvider = ({
	children,
	value,
}: { children: React.ReactNode; value: PaymentMethod }) => {
	return (
		<PaymentMethodContext.Provider value={value}>
			{children}
		</PaymentMethodContext.Provider>
	);
};

export const usePaymentMethodContext = () => useContext(PaymentMethodContext);
