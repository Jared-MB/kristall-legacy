export interface Payment {
	_id: string;
	total: number;
	paymentMethod: string;
	advance: number;
	pendingPayment: number;
	account: string;
}
