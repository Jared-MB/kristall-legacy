import type { VirtualShowroom } from "../../content-management/types";
import type { BankAccounts } from "../../financial-management/types";
export interface Shop {
	_id: string;
	shopName: string;
	username: string;
	logo: string;
	showroom: VirtualShowroom;
	/**
	 * @deprecated Use Settings  instead
	 */
	bankAccounts: BankAccounts;
}
