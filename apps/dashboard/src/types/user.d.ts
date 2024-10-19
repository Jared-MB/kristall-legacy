export type Role = "admin" | "user" | "SuperAdmin";
export type Package = "basic" | "standard" | "plus";

interface Subscription {
	isSubscribed: boolean;
	hasCanceled: boolean;
	isSubscribedUntil: number;
}

export interface User {
	_id: string;
	username: string;
	name: string;
	password?: string;
	email: string;
	role: Role | null;
	// shop: Shop;
	package: Package | null;
	stripeId: string;
	createdAt: Date | null;
	token: string;
	subscription: Subscription;
	permissions: string;
	hasAcceptedTerms: boolean;
	removeBankAccounts: boolean;
	firebaseId: string;
}
