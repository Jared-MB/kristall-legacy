import type { Customer } from "./customer";
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
	client: Customer;
	products: ProductOrder[];
	location: {
		name: string;
		address: string;
		phone: string;
	} | null;
	secret: string;
}

type PaymentSummary = Pick<Payment, "total">;
export type OrderSummary = Pick<Order, "_id" | "code" | "date" | "status"> & {
	payment: PaymentSummary;
};
