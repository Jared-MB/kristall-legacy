import type { UUID } from "node:crypto";

/**
 * @deprecated
 */
export interface Shop {
	_id: string;
	shopName: string;
	username: string;
	logo: string;
	showroom: Showroom;
	settings?: Settings;
}

/**
 * @deprecated
 */
export interface Settings {
	_id: UUID;
	defaultBatchEnabled: boolean;
}

/**
 * @deprecated
 */
export interface Showroom {
	isPublic: boolean;
	url: string;
}
