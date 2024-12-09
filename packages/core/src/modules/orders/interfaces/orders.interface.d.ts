import type { ORDER_STATUS } from "../constants";

export type OrderStatus = keyof typeof ORDER_STATUS;

export interface Order {
	_id: string;
	date: Date;
	code: string;
	status: OrderStatus;
	payment: Payment;
}

export interface Payment {
	total: number;
}
