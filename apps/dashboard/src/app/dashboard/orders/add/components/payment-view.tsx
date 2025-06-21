"use client";

import { cn } from "@kristall/ui/utils/cn";
import { create } from "zustand";

interface PaymentViewState {
	isTransfer: boolean;
	setIsTransfer: (isTransfer: boolean) => void;
}

export const usePaymentView = create<PaymentViewState>()((set) => ({
	isTransfer: false,
	setIsTransfer: (isTransfer: boolean) => set({ isTransfer }),
}));

export function PaymentView({ children }: { children: React.ReactNode }) {
	const isTransfer = usePaymentView((state) => state.isTransfer);

	return (
		<div
			className={cn("grid gap-4", isTransfer ? "grid-cols-3" : "grid-cols-2")}
		>
			{children}
		</div>
	);
}
