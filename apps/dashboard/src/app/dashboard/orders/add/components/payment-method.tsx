"use client";

import { PaymentMethod as PM } from "@kristall/core/interfaces/payment";

import { useEffect, useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@kristall/ui/select";

import { usePaymentView } from "./payment-view";

export function PaymentMethod() {
	const [paymentMethod, setPaymentMethod] = useState<PM>(PM.PENDING);
	const setIsTransfer = usePaymentView((state) => state.setIsTransfer);

	const handlePaymentMethod = (value: PM) => {
		setPaymentMethod(value);
		setIsTransfer(value === PM.TRANSFER);
	};

	useEffect(() => {
		return () => {
			setIsTransfer(false);
		};
	}, []);

	return (
		<Select
			value={paymentMethod}
			name="paymentMethod"
			onValueChange={handlePaymentMethod}
		>
			<SelectTrigger>
				<SelectValue placeholder="Seleccionar método de pago" />
			</SelectTrigger>
			<SelectContent>
				<SelectItem value={PM.CASH}>Efectivo</SelectItem>
				<SelectItem value={PM.CARD}>Tarjeta</SelectItem>
				<SelectItem value={PM.TRANSFER}>Transferencia</SelectItem>
				<SelectItem value={PM.PENDING}>Pendiente</SelectItem>
			</SelectContent>
		</Select>
	);
}

export function BankAccountsView({ children }: { children: React.ReactNode }) {
	const isTransfer = usePaymentView((state) => state.isTransfer);

	if (!isTransfer) {
		return null;
	}

	return children;
}
