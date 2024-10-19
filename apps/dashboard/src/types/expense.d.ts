import type { Cancellation } from "./cancellation";
import type { User } from "./user";

export interface Expense {
	_id: string;
	concept: string;
	amount: number;
	user: User;
	date: Date;
	shop: {
		_id: string;
		name: string;
	};
	cancellation: Cancellation | null;
}
