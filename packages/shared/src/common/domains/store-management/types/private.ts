import type { UUID } from "node:crypto";

export interface PrivateShop {
	_id: UUID;
	shopName: string;
	username: string;
	logo: string;
	showroom: {
		isPublic: boolean;
		url: string;
	};
}
