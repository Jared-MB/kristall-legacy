import type { Payment } from "./payment";
import type { ProductOrder } from "./product";

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
	products: ProductOrder[];
	location: {
		name: string;
		address: string;
		phone: string;
	} | null;
}
