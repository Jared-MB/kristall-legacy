"use client";

import { usePaymentMethodContext } from "../../context/payment-method.context";
import Cash from "./cash";
import Transfer from "./transfer";

export default function PaymentMethod() {
	const paymentMethod = usePaymentMethodContext();

	if (paymentMethod === "card") {
		// TODO: In the future, will receive a web hook from the payment gateway to confirm the payment (MERCADO_PAGO | CLIP)
		return;
	}
	if (paymentMethod === "transfer") {
		return <Transfer />;
	}
	if (paymentMethod === "cash") {
		return <Cash />;
	}
}
