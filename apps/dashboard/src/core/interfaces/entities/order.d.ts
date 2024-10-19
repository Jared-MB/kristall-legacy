export interface Order {
	_id: string;
	code: string;
	date: Date;
	status:
		| "received"
		| "preparing"
		| "delivering"
		| "ready"
		| "completed"
		| "cancelled";
	payment: Payment;
	client: Customer;
	products: ProductOrder[];
	location: {
		name: string;
		address: string;
		phone: string;
	} | null;
	secret: string;
}
