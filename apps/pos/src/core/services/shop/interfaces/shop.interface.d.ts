import type { UUID } from "node:crypto";

export interface Shop {
	_id: string;
	shopName: string;
	username: string;
	logo: string;
	showroom: Showroom;
	bankAccounts: BankAccounts;
	settings?: Settings;
}

export interface Settings {
	_id: UUID;
	defaultBatchEnabled: boolean;
}

export interface BankAccounts {
	hasAcceptedTerms: boolean;
	removeBankAccounts: boolean;
}

export interface Showroom {
	isPublic: boolean;
	url: string;
}
