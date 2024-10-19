export interface Payment {
	_id: string;
	total: number;
	paymentMethod: "cash" | "card" | "transfer" | "pending";
	advance: number;
	pendingPayment: number;
	account: string;
}
