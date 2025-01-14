import type { UUID } from "node:crypto";
import type { VirtualShowroom } from "../../virtual-showroom/interfaces";

export interface Shop {
	_id: string;
	shopName: string;
	username: string;
	logo: string;
	showroom: VirtualShowroom;
	/**
	 * @deprecated Use Settings instead
	 */
	bankAccounts: BankAccounts;
}

export interface Settings {
	_id: UUID;
	defaultBatchEnabled: boolean;
}

/**
 * @deprecated
 */
export interface BankAccounts {
	hasAcceptedTerms: boolean;
	removeBankAccounts: boolean;
}
