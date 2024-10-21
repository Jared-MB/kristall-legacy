export interface Order {
	_id: string;
	date: Date;
	code: string;
	status:
		| "received"
		| "preparing"
		| "delivering"
		| "ready"
		| "completed"
		| "cancelled";
	payment: Payment;
}

export interface Payment {
	total: number;
}
